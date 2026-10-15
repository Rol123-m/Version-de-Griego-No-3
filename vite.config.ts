import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Base del sitio.
 *  - GitHub Pages de proyecto: /NOMBRE-DEL-REPO/   (valor por defecto)
 *  - Dominio propio o usuario.github.io (raíz):     VITE_BASE=/ npm run build
 */
const REPO_NAME = 'Version-de-Griego-No-3';
const BASE = process.env.VITE_BASE ?? `/${REPO_NAME}/`;

/** Genera semanas-index.json (lista de todo el contenido para descarga offline) y versiona el service worker. */
function pwaAssets(): Plugin {
  const walk = (dir: string): string[] =>
    fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) =>
      e.isDirectory() ? walk(path.join(dir, e.name)) : [path.join(dir, e.name)]
    );
  return {
    name: 'pwa-assets',
    apply: 'build',
    closeBundle() {
      const out = path.resolve('dist');
      const pub = path.resolve('public');
      const files = walk(path.join(pub, 'semanas'))
        .map((f) => path.relative(pub, f).split(path.sep))
        // solo lo que la app puede abrir sin conexión (omitimos documentos pesados de trabajo)
        .filter((p) => !/\.(docx?|zip|psd)$/i.test(p[p.length - 1]))
        .map((p) => p.map(encodeURIComponent).join('/'));
      files.push('estilos-contenido.css');
      fs.writeFileSync(path.join(out, 'semanas-index.json'), JSON.stringify({ base: BASE, files }));

      const swPath = path.join(out, 'sw.js');
      const build = new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14);
      fs.writeFileSync(swPath, fs.readFileSync(swPath, 'utf8').replace("const BUILD = '__BUILD_ID__'", `const BUILD = '${build}'`));
      // GitHub Pages: sin Jekyll (evita problemas con carpetas/archivos especiales)
      fs.writeFileSync(path.join(out, '.nojekyll'), '');
    },
  };
}

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss(), pwaAssets()],
  server: { host: '0.0.0.0', port: 3000 },
  build: {
    chunkSizeWarningLimit: 900,
    rollupOptions: {
      output: {
        manualChunks: {
          firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
          react: ['react', 'react-dom'],
        },
      },
    },
  },
});
