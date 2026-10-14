import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// 👇 CAMBIA ESTO por el nombre EXACTO de tu repo en GitHub
const REPO_NAME = 'nombre-de-tu-repo';  // ⚠️ AJUSTA ESTO

export default defineConfig({
  base: `/${REPO_NAME}/`,  // 👈 CLAVE para GitHub Pages
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    host: '0.0.0.0',
    port: 3000,
    fs: {
      allow: ['.']
    }
  }
});