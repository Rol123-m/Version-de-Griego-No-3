import React, { useState } from 'react';
import { Download, WifiOff, RefreshCw, Smartphone, X, CloudDownload, Trash2, Share, PlusSquare, CheckCircle2 } from 'lucide-react';
import { usePWA } from './usePWA';

const DISMISS_KEY = 'pwa-install-dismissed';

export const PWAManager: React.FC = () => {
  const pwa = usePWA();
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(() => localStorage.getItem(DISMISS_KEY) === '1');

  const showBanner = !pwa.installed && !dismissed && (pwa.canInstall || pwa.isIOS);
  const downloading = pwa.progress && pwa.progress.done < pwa.progress.total;
  const pct = pwa.progress ? Math.round((pwa.progress.done / Math.max(1, pwa.progress.total)) * 100) : 0;
  const hasOffline = pwa.cachedCount > 20;

  return (
    <>
      {/* Aviso sin conexión */}
      {!pwa.online && (
        <div className="fixed top-0 inset-x-0 z-[70] bg-amber-500 text-slate-950 text-xs sm:text-sm font-bold py-1.5 px-3 flex items-center justify-center gap-2 shadow">
          <WifiOff className="w-4 h-4" /> Sin conexión — puedes seguir con las lecciones guardadas en tu dispositivo
        </div>
      )}

      {/* Nueva versión */}
      {pwa.updateReady && (
        <div className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-4 sm:w-96 z-[70] bg-slate-900 text-white rounded-2xl shadow-2xl border border-sky-600/60 p-4 flex items-center gap-3">
          <RefreshCw className="w-6 h-6 text-sky-400 shrink-0" />
          <div className="flex-1 text-sm"><b>Nueva versión disponible</b><p className="text-slate-400 text-xs">Actualiza para ver los últimos cambios.</p></div>
          <button onClick={pwa.applyUpdate} className="px-3 py-2 rounded-lg bg-sky-600 hover:bg-sky-700 text-xs font-bold cursor-pointer">Actualizar</button>
        </div>
      )}

      {/* Banner de instalación */}
      {showBanner && !pwa.updateReady && (
        <div className="fixed bottom-4 inset-x-4 sm:left-auto sm:right-4 sm:w-96 z-[60] bg-slate-900 text-white rounded-2xl shadow-2xl border border-amber-500/50 p-4">
          <button onClick={() => { localStorage.setItem(DISMISS_KEY, '1'); setDismissed(true); }}
            className="absolute top-2 right-2 p-1 text-slate-400 hover:text-white cursor-pointer" aria-label="Cerrar"><X className="w-4 h-4" /></button>
          <div className="flex items-start gap-3">
            <Smartphone className="w-7 h-7 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-sm">
              <b>Instala el Curso de Griego</b>
              <p className="text-slate-400 text-xs mt-0.5">Ábrelo como una app, a pantalla completa y sin conexión.</p>
              {pwa.canInstall ? (
                <button onClick={pwa.install} className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-extrabold cursor-pointer">
                  <Download className="w-4 h-4" /> Instalar app
                </button>
              ) : (
                <p className="mt-2 text-xs text-slate-300 flex flex-wrap items-center gap-1">
                  Toca <Share className="w-4 h-4 inline text-sky-400" /> y luego <b>«Añadir a pantalla de inicio»</b> <PlusSquare className="w-4 h-4 inline text-sky-400" />
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Botón flotante: uso sin conexión */}
      {pwa.swSupported && import.meta.env.PROD && (
        <>
          <button onClick={() => setOpen(true)} title="Uso sin conexión"
            className="fixed bottom-4 left-4 z-[55] w-12 h-12 rounded-full bg-slate-900 text-amber-400 border border-slate-700 shadow-xl flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
            {hasOffline ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <CloudDownload className="w-5 h-5" />}
          </button>

          {open && (
            <div className="fixed inset-0 z-[80] bg-black/60 flex items-end sm:items-center justify-center p-3" onClick={() => setOpen(false)}>
              <div className="bg-white text-slate-800 rounded-3xl w-full max-w-md p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold font-serif">Uso sin conexión</h3>
                  <button onClick={() => setOpen(false)} className="p-1 text-slate-400 hover:text-slate-700 cursor-pointer"><X className="w-5 h-5" /></button>
                </div>
                <p className="text-sm text-slate-600 mb-4">
                  Descarga las 30 semanas (lecciones, vocabulario y juegos) para estudiar sin internet. Los exámenes de Google Forms y los videos de Drive sí requieren conexión.
                </p>

                {downloading && (
                  <div className="mb-4">
                    <div className="h-2.5 rounded-full bg-slate-200 overflow-hidden"><div className="h-full bg-sky-600 transition-all" style={{ width: `${pct}%` }} /></div>
                    <p className="text-xs text-slate-500 mt-1">Descargando… {pwa.progress!.done} / {pwa.progress!.total} ({pct}%)</p>
                  </div>
                )}
                {!downloading && pwa.progress && (
                  <p className="text-sm text-emerald-700 font-semibold mb-4">
                    ✓ Contenido guardado{pwa.progress.failed ? ` (${pwa.progress.failed} archivos no se pudieron descargar)` : ''}
                  </p>
                )}
                {!downloading && !pwa.progress && hasOffline && (
                  <p className="text-sm text-emerald-700 font-semibold mb-4">✓ {pwa.cachedCount} archivos disponibles sin conexión</p>
                )}

                <div className="flex flex-wrap gap-2">
                  <button disabled={!pwa.online || !!downloading} onClick={pwa.downloadOffline}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 disabled:opacity-50 text-white text-sm font-bold cursor-pointer">
                    <CloudDownload className="w-4 h-4" /> {hasOffline ? 'Actualizar descarga' : 'Descargar todo el curso'}
                  </button>
                  {hasOffline && (
                    <button onClick={pwa.clearOffline} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold cursor-pointer">
                      <Trash2 className="w-4 h-4" /> Borrar
                    </button>
                  )}
                  {!pwa.installed && pwa.canInstall && (
                    <button onClick={pwa.install} className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-sm font-bold cursor-pointer">
                      <Download className="w-4 h-4" /> Instalar app
                    </button>
                  )}
                </div>
                {pwa.installed && <p className="text-xs text-slate-500 mt-3">La app ya está instalada en este dispositivo.</p>}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};
