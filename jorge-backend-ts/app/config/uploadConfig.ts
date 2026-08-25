import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import { ensureUploadsDir, UPLOADS_DIR } from './paths';

// Ruta de la carpeta uploads (configurable con UPLOADS_DIR para usar un volumen).
const uploadDir = UPLOADS_DIR;

// Un volumen recién montado viene vacío: sin esto multer falla al primer upload.
ensureUploadsDir();

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Almacenar el archivo en la carpeta 'uploads'
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext); // Genera un nombre único para el archivo
  },
});

// Filtro para tipos de archivo
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const allowedMimeTypes = ['image/jpeg', 'image/png', 'image/jpg'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten imágenes JPEG o PNG'));
  }
};

// Exportar la configuración de multer
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // limitado a 10 MB
  fileFilter,
});

// Función para manejar la ruta de la imagen
const generateImageUrl = (filename: string): string => {
  return `/uploads/${filename}`; // URL relativa que será accesible desde el frontend
};

// Exportar el middleware de Multer y la función de generación de URL
export { generateImageUrl, upload };
