import fs from 'fs';
import path from 'path';

/**
 * Raíz del proyecto backend, válida tanto en desarrollo como compilado.
 *
 * En desarrollo  __dirname = <root>/app/config   -> ../.. = <root>
 * En producción   __dirname = <root>/dist/config -> ../.. = <root>
 *
 * Es necesario porque `tsc` solo emite .js: ni el swagger.yaml ni las imágenes
 * de uploads se copian a dist/, así que hay que resolverlos contra la raíz.
 */
export const PROJECT_ROOT = path.resolve(__dirname, '..', '..');

/** Definición de Swagger (yaml, no lo copia tsc). */
export const SWAGGER_FILE = path.join(
  PROJECT_ROOT,
  'app',
  'docs',
  'swagger.yaml'
);

/**
 * Carpeta donde se guardan las imágenes subidas.
 *
 * En un PaaS el disco es efímero: hay que apuntar UPLOADS_DIR a un volumen
 * persistente (p. ej. /data/uploads en Railway) o las imágenes se pierden
 * en cada despliegue.
 */
export const UPLOADS_DIR = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : path.join(PROJECT_ROOT, 'app', 'uploads');

/** Crea la carpeta de uploads si no existe (volumen recién montado). */
export const ensureUploadsDir = (): void => {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
};
