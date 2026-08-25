# Despliegue de BioCan — Railway (MySQL + API) + Vercel (front)

Arquitectura: **MySQL** y **API Express** en Railway, **front React** en Vercel.

> **El orden importa.** Hay una dependencia circular: el front necesita la URL
> de la API, y la API necesita la URL del front para el CORS. Se rompe
> desplegando la API primero, luego el front, y volviendo a la API para ajustar
> `CORS_ORIGINS`. Está detallado en los pasos 2, 4 y 5.

---

## Paso 0 — Rotar los secretos filtrados (antes de nada)

El fichero `jorge-backend-ts/.env` estaba versionado con la contraseña de MySQL
y el `JWT_SECRET`. Ya está fuera del control de versiones, pero **sigue en el
historial de git**, así que hay que dar los valores antiguos por comprometidos.

1. Cambia la contraseña de tu MySQL local.
2. Genera un `JWT_SECRET` nuevo y largo:
   ```bash
   node -e "console.log(require('crypto').randomBytes(48).toString('hex'))"
   ```
3. No reutilices ninguno de los dos valores anteriores en producción.

Si el repositorio es o va a ser público, además conviene purgar el historial
(`git filter-repo --path jorge-backend-ts/.env --invert-paths`) y forzar el push.
Eso reescribe los hashes de los commits: hazlo antes de que nadie más clone.

---

## Paso 1 — Base de datos MySQL en Railway

1. En Railway: **New Project → Add MySQL**.
2. Abre la pestaña **Variables** del servicio MySQL y localiza
   `MYSQLHOST`, `MYSQLPORT`, `MYSQLDATABASE`, `MYSQLUSER`, `MYSQLPASSWORD`.
   La base de datos por defecto se llama `railway`.
3. Importa el dump desde tu máquina usando la **URL pública** (`Connect →
   Public Network`, del tipo `xxx.proxy.rlwy.net` con su puerto).

   En **PowerShell** hay dos trampas: `mysql.exe` no está en el PATH, y
   PowerShell no admite `<` para redirigir entrada. Por eso se envuelve en
   `cmd /c`, que además pasa el fichero byte a byte y no rompe los acentos:

   ```bash
   cmd /c '"C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" --default-character-set=utf8mb4 -h HOST -P PUERTO -u root -pPASSWORD railway < Dump20250516.sql'
   ```

   Sin espacio entre `-p` y la contraseña: es la sintaxis que espera MySQL.

   El dump no contiene `CREATE DATABASE` ni `USE`, por eso hay que indicar
   `railway` como base de datos destino.

4. Comprueba que están las 6 tablas:
   ```bash
   & "C:\Program Files\MySQL\MySQL Server 8.0\bin\mysql.exe" -h HOST -P PUERTO -u root -pPASSWORD railway -e "SHOW TABLES;"
   ```
   Deben salir en **minúscula**: `multimedia`, `orderdetails`, `orders`,
   `product`, `ratings`, `users`. MySQL en Linux distingue mayúsculas en los
   nombres de tabla, y los modelos están alineados con esta grafía.

---

## Paso 2 — API en Railway

1. **New → GitHub Repo** y elige este repositorio.
2. En **Settings → Root Directory** pon `jorge-backend-ts`. Sin esto Railway
   busca el `package.json` en la raíz y no lo encuentra.
3. Railway detecta Node y ejecutará `npm ci`, `npm run build` y `npm start`.
   El `railway.json` ya apunta el healthcheck a `/health`.
4. En **Variables** del servicio de la API:

   | Variable | Valor |
   |---|---|
   | `DB_HOST` | `${{MySQL.MYSQLHOST}}` |
   | `DB_PORT` | `${{MySQL.MYSQLPORT}}` |
   | `DB_DATABASE` | `${{MySQL.MYSQLDATABASE}}` |
   | `DB_USERNAME` | `${{MySQL.MYSQLUSER}}` |
   | `DB_PASSWORD` | `${{MySQL.MYSQLPASSWORD}}` |
   | `JWT_SECRET` | el secreto nuevo del paso 0 |
   | `NODE_ENV` | `production` |
   | `DB_SYNC` | `false` |
   | `DB_LOGGING` | `false` |
   | `CORS_ORIGINS` | provisional: `http://localhost:5173` |

   La sintaxis `${{MySQL.VARIABLE}}` es una referencia de Railway: no copies los
   valores a mano, así se actualizan solos si rotan.

   `PORT` **no** se pone: Railway lo inyecta y el código ya lo respeta.

   `DB_SYNC=false` evita que Sequelize toque un esquema que ya viene del dump.
   Si prefieres que cree las tablas él, importa el dump después o déjalo en `true`.

5. Genera el dominio en **Settings → Networking → Generate Domain** y guarda la
   URL (algo como `https://biocan-api.up.railway.app`).
6. Verifica: `https://<tu-api>.up.railway.app/health` debe devolver
   `{"status":"ok"}`.

---

## Paso 3 — Imágenes de producto (volumen persistente)

El disco de un contenedor es efímero: sin volumen, **cada despliegue borra las
imágenes que hayan subido los usuarios**.

Para validar el despliegue puedes empezar sin volumen — las 14 imágenes que
vienen en el repositorio (`jorge-backend-ts/app/uploads/`) se sirven bien. Pero
antes de dar la web por buena:

1. **Settings → Volumes → New Volume**, punto de montaje `/data`.
2. Añade la variable `UPLOADS_DIR=/data/uploads`.
3. Copia las imágenes existentes al volumen, o las fotos de los 5 productos del
   dump dejarán de verse (la tabla `multimedia` seguirá apuntando a ficheros que
   ya no están en la ruta nueva). Con la CLI de Railway:
   ```bash
   railway run bash -c "mkdir -p /data/uploads && cp -rn app/uploads/. /data/uploads/"
   ```

---

## Paso 4 — Front en Vercel

1. **Add New → Project** e importa el repositorio.
2. **Root Directory**: `frontend`.
3. Framework preset: **Vite** (build `npm run build`, salida `dist`).
4. Variable de entorno:

   | Variable | Valor |
   |---|---|
   | `VITE_BASE_URL` | `https://<tu-api>.up.railway.app/api` |

   Con el sufijo `/api` y **sin** barra final. La ruta de imágenes (`/uploads`)
   se deriva quitando el `/api`.

   > Vite incrusta las variables en el bundle **en tiempo de build**. Si cambias
   > `VITE_BASE_URL` hay que **volver a desplegar**; no basta con reiniciar.

5. Deploy, y guarda la URL resultante (`https://biocan.vercel.app`).

El `frontend/vercel.json` ya incluye el rewrite a `index.html`, necesario para
que las rutas de React Router (`/product/1`) no den 404 al recargar.

---

## Paso 5 — Conectar los dos extremos

Vuelve al servicio de la API en Railway y ajusta:

| Variable | Valor |
|---|---|
| `CORS_ORIGINS` | `https://biocan.vercel.app,https://*.vercel.app` |
| `CROSS_SITE_COOKIES` | `true` |

El comodín `https://*.vercel.app` cubre las URL de *preview*, que cambian en
cada despliegue. Si no lo pones, solo funcionará el dominio de producción.

`CROSS_SITE_COOKIES=true` hace que la cookie de sesión salga como
`SameSite=None; Secure`. **Es imprescindible aquí**: con el front en
`vercel.app` y la API en `railway.app` la petición es *cross-site*, y con
`SameSite=Strict` el navegador nunca envía la cookie — el login responde 200 y
después todo da 401.

Solo pon `CROSS_SITE_COOKIES=false` si algún día front y API comparten dominio
(por ejemplo `biocan.es` y `api.biocan.es`).

---

## Paso 6 — Comprobación final

- [ ] `GET /health` de la API responde `{"status":"ok"}`
- [ ] La portada del front carga los 5 productos
- [ ] Se ven las fotos de producto (vienen de `<api>/uploads/...`)
- [ ] Se ven el logo y el fondo (vienen de `/img/...` del propio front)
- [ ] Login correcto **y** una recarga mantiene la sesión ← valida la cookie cross-site
- [ ] Recargar directamente en `/product/1` no da 404 ← valida el rewrite de Vercel
- [ ] Subir una imagen desde el panel privado funciona y **sobrevive a un redeploy**
      ← valida el volumen

Si el login funciona pero al recargar te expulsa, el problema es
`CROSS_SITE_COOKIES` / `CORS_ORIGINS`, no las credenciales.

---

## Dominio propio (biocan.es)

Cuando quieras dejar de usar los subdominios de Vercel y Railway:

1. El dominio raíz (`biocan.es`) al proyecto de Vercel.
2. Un subdominio (`api.biocan.es`) al servicio de Railway.
3. Actualiza `VITE_BASE_URL` a `https://api.biocan.es/api` y **redespliega el
   front** (recuerda: se incrusta en el build).
4. Actualiza `CORS_ORIGINS` a `https://biocan.es`.
5. Al compartir dominio de segundo nivel puedes poner
   `CROSS_SITE_COOKIES=false`, que usa `SameSite=Lax` y es algo más restrictivo.

---

## Desarrollo en local

```bash
# Backend
cd jorge-backend-ts
cp .env.example .env      # rellena DB_* y JWT_SECRET
npm install
npm run dev               # http://localhost:3000

# Frontend (otra terminal)
cd frontend
cp .env.example .env      # VITE_BASE_URL=http://localhost:3000/api
npm install
npm run dev               # http://localhost:5173
```

Las variables del backend están documentadas en `jorge-backend-ts/.env.example`.
