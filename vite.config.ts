import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// 👇 CAMBIA ESTO por el nombre EXACTO de tu repo
const REPO_NAME = 'Version-de-Griego-No-3';  // ✅ Nombre real

export default defineConfig({
  base: `/${REPO_NAME}/`,
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