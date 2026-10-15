import { useCallback, useEffect, useRef, useState } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export interface OfflineProgress { done: number; total: number; failed: number; }

const BASE = import.meta.env.BASE_URL;
const isStandaloneNow = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as unknown as { standalone?: boolean }).standalone === true;

export function usePWA() {
  const [installEvent, setInstallEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(isStandaloneNow());
  const [online, setOnline] = useState(navigator.onLine);
  const [updateReady, setUpdateReady] = useState(false);
  const [cachedCount, setCachedCount] = useState(0);
  const [progress, setProgress] = useState<OfflineProgress | null>(null);
  const [swSupported] = useState('serviceWorker' in navigator);
  const waitingRef = useRef<ServiceWorker | null>(null);

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

  // Registro del service worker (solo producción)
  useEffect(() => {
    if (!('serviceWorker' in navigator) || !import.meta.env.PROD) return;
    let cancelled = false;
    navigator.serviceWorker.register(`${BASE}sw.js`, { scope: BASE }).then((reg) => {
      if (cancelled) return;
      const watch = (sw: ServiceWorker | null) => {
        if (!sw) return;
        sw.addEventListener('statechange', () => {
          if (sw.state === 'installed' && navigator.serviceWorker.controller) {
            waitingRef.current = sw; setUpdateReady(true);
          }
        });
      };
      if (reg.waiting && navigator.serviceWorker.controller) { waitingRef.current = reg.waiting; setUpdateReady(true); }
      reg.addEventListener('updatefound', () => watch(reg.installing));
      // Buscar versión nueva al volver a la app
      const check = () => reg.update().catch(() => {});
      document.addEventListener('visibilitychange', () => { if (!document.hidden) check(); });
      setInterval(check, 60 * 60 * 1000);
    }).catch((e) => console.warn('SW no registrado:', e));

    let reloading = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (reloading) return; reloading = true; window.location.reload();
    });
    const onMsg = (e: MessageEvent) => {
      const d = e.data || {};
      if (d.type === 'CACHE_PROGRESS') setProgress({ done: d.done, total: d.total, failed: d.failed });
      if (d.type === 'CACHE_DONE') { setProgress({ done: d.total, total: d.total, failed: d.failed }); askStatus(); }
      if (d.type === 'STATUS') setCachedCount(d.cachedContent);
      if (d.type === 'CONTENT_CLEARED') { setCachedCount(0); setProgress(null); }
    };
    navigator.serviceWorker.addEventListener('message', onMsg);
    navigator.serviceWorker.ready.then(askStatus);
    return () => { cancelled = true; navigator.serviceWorker.removeEventListener('message', onMsg); };
  }, []);

  // Instalación
  useEffect(() => {
    const before = (e: Event) => { e.preventDefault(); setInstallEvent(e as BeforeInstallPromptEvent); };
    const done = () => { setInstalled(true); setInstallEvent(null); };
    const on = () => setOnline(true), off = () => setOnline(false);
    window.addEventListener('beforeinstallprompt', before);
    window.addEventListener('appinstalled', done);
    window.addEventListener('online', on); window.addEventListener('offline', off);
    return () => {
      window.removeEventListener('beforeinstallprompt', before);
      window.removeEventListener('appinstalled', done);
      window.removeEventListener('online', on); window.removeEventListener('offline', off);
    };
  }, []);

  const install = useCallback(async () => {
    if (!installEvent) return;
    await installEvent.prompt();
    const { outcome } = await installEvent.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setInstallEvent(null);
  }, [installEvent]);

  const applyUpdate = useCallback(() => waitingRef.current?.postMessage({ type: 'SKIP_WAITING' }), []);

  const downloadOffline = useCallback(async () => {
    const reg = await navigator.serviceWorker.ready;
    const res = await fetch(`${BASE}semanas-index.json`, { cache: 'no-cache' });
    const { files } = (await res.json()) as { files: string[] };
    const urls = files.map((f) => new URL(BASE + f, window.location.origin).toString());
    setProgress({ done: 0, total: urls.length, failed: 0 });
    reg.active?.postMessage({ type: 'CACHE_URLS', urls });
  }, []);

  const clearOffline = useCallback(async () => {
    const reg = await navigator.serviceWorker.ready;
    reg.active?.postMessage({ type: 'CLEAR_CONTENT' });
  }, []);

  return {
    swSupported, canInstall: !!installEvent, installed, isIOS, online, updateReady,
    cachedCount, progress, install, applyUpdate, downloadOffline, clearOffline,
  };
}

function askStatus() {
  navigator.serviceWorker.ready.then((r) => r.active?.postMessage({ type: 'GET_STATUS' }));
}
