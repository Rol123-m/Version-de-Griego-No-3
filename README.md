# Curso de Griego Koiné Elemental — Versión 2.0 (React)

Plataforma educativa moderna desarrollada con **React 19**, **TypeScript**, **Tailwind CSS 4** y sincronización en la nube con **Firebase Firestore** para el **Ministerio "Vivos para Servir"**.

## Características Principales

- **30 Semanas de Aprendizaje**: Plan curricular completo desde el alfabeto griego y sustantivos hasta participios, modos subjuntivo/imperativo y lectura exegética de Juan 1 y 1 Juan.
- **Autenticación Multi-Rol**:
  - Alumnos agrupados en **Alfa (α)**, **Beta (β)** y **Gamma (γ)**.
  - Perfiles de docentes (Profesor Titular, Asistente, Facilitador) con panel de supervisión.
  - Acceso rápido de prueba para evaluación inmediata en 1 clic.
- **Sincronización Híbrida**:
  - Persistencia instantánea en `localStorage` con respaldo y sincronización en **Firebase Firestore**.
  - Libreta de calificaciones y registro de progreso semanal.
- **Materiales de Estudio y Juegos**:
  - Visualizador in-app para estudiar lecciones interactivas, PDFs y videos sin salir de la plataforma.
  - Juegos interactivos (emparejamiento, palabras, carreras contrarreloj, rompecabezas gramaticales).
  - Entrenador de vocabulario interactivo con tarjetas giratorias y cuestionarios rápidos.
  - Tabla interactiva de las 24 letras del alfabeto griego con pronunciación erasmiana y fonética bíblica.
- **Evaluaciones y Exámenes**:
  - Integración directa con los formularios oficiales de Google Forms asignados a cada grupo.
  - Registro de confirmación de envío y calificación.
- **Diplomas y Certificados**:
  - Generador de Certificado de Progreso y Diploma de Graduación personalizable y listo para imprimir en formato PDF.

## Tecnologías Utilizadas

- **React 19**
- **TypeScript 5.7**
- **Vite 6**
- **Tailwind CSS 4**
- **Firebase 12 (Firestore & Auth)**
- **Canvas Confetti**
- **Lucide Icons**

## Estructura y despliegue

- Todo el contenido estático (lecciones, juegos, iconos) vive en `public/`. **Lo que no esté en `public/` no llega a `dist/` y da 404.**
- Las rutas del contenido se escriben como `/semanas/semanaN/...` en `src/data/courseData.ts`; la función `assetUrl()` (`src/utils/assetUrl.ts`) les antepone la base del sitio y codifica espacios/tildes.
- Base por defecto: `/Version-de-Griego-No-3/` (GitHub Pages de proyecto). Para dominio propio: `VITE_BASE=/ npm run build`.
- Despliegue automático: Settings → Pages → Source: **GitHub Actions** (workflow en `.github/workflows/deploy.yml`). Alternativa manual: `npm run deploy` (rama `gh-pages`).

## PWA

- `public/manifest.webmanifest`, `public/sw.js`, `public/icons/*`, `public/offline.html`.
- Instalable en Android/Chrome/Edge/escritorio y en iOS (Compartir → Añadir a pantalla de inicio).
- Botón flotante «Uso sin conexión» para descargar las 30 semanas (≈ 500 archivos). El service worker se versiona en cada build y avisa «Nueva versión disponible».
- El service worker solo se registra en producción (`npm run build && npm run preview`).
