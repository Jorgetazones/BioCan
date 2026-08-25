const RAW_BASE_URL = import.meta.env.VITE_BASE_URL as string | undefined;

// Si falta la variable en el build de producción, la app compila pero llama a
// localhost y parece "roída" sin motivo aparente. Mejor dejar rastro en consola.
if (!RAW_BASE_URL && import.meta.env.PROD) {
  console.error(
    '[Biocan] Falta VITE_BASE_URL en el build. Configúrala en las variables de entorno del hosting (p. ej. https://tu-api.up.railway.app/api).'
  );
}

/** URL base de la API, siempre sin barra final. Incluye el sufijo /api. */
export const API_URL = (RAW_BASE_URL ?? 'http://localhost:3000/api')
  .trim()
  .replace(/\/+$/, '');

/** Origen del servidor, sin el /api: de aquí cuelga /uploads. */
export const SERVER_URL = API_URL.replace(/\/api$/, '');

/** Carpeta pública de imágenes servida por el backend. */
export const UPLOADS_URL = `${SERVER_URL}/uploads`;

export const getEnvVariables = () => {
  return {
    BASE_URL: API_URL,
  };
};

/**
 * URL pública de una imagen subida. Devuelve undefined si no hay fichero, para
 * poder encadenar con la imagen por defecto en el sitio de la llamada.
 */
export const imageUrl = (filename?: string | null): string | undefined =>
  filename ? `${UPLOADS_URL}/${filename}` : undefined;
