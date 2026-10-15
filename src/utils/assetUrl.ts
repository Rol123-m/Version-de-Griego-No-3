/**
 * Convierte una ruta del contenido (p. ej. "/semanas/semana2/HTML/1. Introducción.html")
 * en una URL válida SIEMPRE, sin importar dónde esté desplegado el sitio:
 *   - respeta la base de Vite (GitHub Pages sirve en /Version-de-Griego-No-3/)
 *   - codifica espacios, tildes, comas y caracteres griegos por segmento
 *   - deja intactas las URLs externas (Drive, Google Forms, YouTube...)
 */
const BASE = import.meta.env.BASE_URL; // siempre termina en "/"

const EXTERNAL = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i;

export function assetUrl(path: string): string {
  if (!path || EXTERNAL.test(path)) return path;
  const clean = path.replace(/^\.?\//, '');
  const encoded = clean
    .split('/')
    .map((seg) => {
      try {
        // evita doble codificación si la ruta ya venía codificada
        return encodeURIComponent(decodeURIComponent(seg));
      } catch {
        return encodeURIComponent(seg);
      }
    })
    .join('/');
  return BASE + encoded;
}

export const isExternalUrl = (url: string) => EXTERNAL.test(url);
