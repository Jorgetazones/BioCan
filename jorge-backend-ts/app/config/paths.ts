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
 * Imágenes que vienen con el repositorio. Son datos semilla: la tabla
 * `multimedia` del dump apunta a estos ficheros por nombre.
 */
export const SEED_UPLOADS_DIR = path.join(PROJECT_ROOT, 'app', 'uploads');

/**
 * Carpeta donde se guardan las imágenes subidas.
 *
 * En un PaaS el disco es efímero: hay que apuntar UPLOADS_DIR a un volumen
 * persistente (p. ej. /data/uploads en Railway) o las imágenes se pierden
 * en cada despliegue.
 */
export const UPLOADS_DIR = process.env.UPLOADS_DIR
  ? path.resolve(process.env.UPLOADS_DIR)
  : SEED_UPLOADS_DIR;

/** Crea la carpeta de uploads si no existe (volumen recién montado). */
export const ensureUploadsDir = (): void => {
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });
};

/**
 * Copia al destino las imágenes semilla que falten y devuelve cuántas ha
 * copiado.
 *
 * Un volumen recién montado viene vacío, así que sin esto las fotos de los
 * productos del dump darían 404 en cuanto se define UPLOADS_DIR. Se hace en
 * cada arranque porque es idempotente: solo copia lo que no existe, de modo
 * que nunca pisa una imagen subida por un usuario, y el volumen se repuebla
 * solo si algún día se recrea.
 */
export const seedUploadsDir = (): number => {
  // Sin volumen configurado, origen y destino son la misma carpeta.
  if (UPLOADS_DIR === SEED_UPLOADS_DIR) return 0;
  if (!fs.existsSync(SEED_UPLOADS_DIR)) return 0;

  let copied = 0;

  for (const entry of fs.readdirSync(SEED_UPLOADS_DIR, {
    withFileTypes: true,
  })) {
    if (!entry.isFile()) continue;

    const target = path.join(UPLOADS_DIR, entry.name);
    if (fs.existsSync(target)) continue;

    fs.copyFileSync(path.join(SEED_UPLOADS_DIR, entry.name), target);
    copied++;
  }

  return copied;
};
