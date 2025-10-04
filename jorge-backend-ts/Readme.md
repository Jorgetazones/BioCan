# Backend con NodeJs y Express

### Resumen de las acciones

1. GET  
   Descripción: Se utiliza para recuperar información sin modificar nada en el servidor.
   Ejemplo: Obtener una lista de usuarios o un usuario específico.
   Códigos de estado comunes:
   200 OK: Si la solicitud fue exitosa y se devuelven datos.
   404 Not Found: Si el recurso no existe.

2. POST  
   Descripción: Se utiliza para enviar datos al servidor con el fin de crear un nuevo recurso.
   Ejemplo: Crear un nuevo usuario.
   Códigos de estado comunes:
   201 Created: Si el recurso fue creado con éxito.
   400 Bad Request: Si los datos enviados son inválidos o faltan parámetros.
   409 Conflict: Hay conflicto al actualizar, el correo electrónico del usuario ya se está utilizando

3. PUT  
   Descripción: Se utiliza para actualizar un recurso completo en el servidor, reemplazando sus datos.
   Ejemplo: Actualizar el nombre o correo electrónico de un usuario.
   Códigos de estado comunes:
   200 OK: Si la actualización fue exitosa.
   400 Bad Request: Si los datos proporcionados son inválidos.
   404 Not Found: Si el recurso no existe para actualizar.
   409 Conflict: Hay conflicto al actualizar, el pedido se ha cerrado y no se puede cambiar de estado.

4. PATCH  
   Descripción: Similar a PUT, pero solo modifica ciertos campos del recurso en lugar de reemplazarlo completamente.
   Ejemplo: Actualizar solo el correo electrónico de un usuario, sin modificar otros datos.
   Códigos de estado comunes:
   200 OK: Si la actualización fue exitosa.
   400 Bad Request: Si los datos son inválidos.
   404 Not Found: Si el recurso no existe para actualizar.
   409 Conflict: Hay conflicto al actualizar, el pedido se ha cerrado y no se puede cambiar de estado

5. DELETE
   Descripción: Se utiliza para eliminar un recurso específico en el servidor.
   Ejemplo: Eliminar un usuario de la base de datos.
   Códigos de estado comunes:
   200 OK: Si el recurso fue eliminado con éxito (también se puede usar 204 No Content si no se devuelve contenido).
   404 Not Found: Si el recurso no existe para eliminar.

### Resumen de estados por acciones

GET
200 OK - Solicitud exitosa, datos devueltos.
404 Not Found - El recurso no existe.

POST
201 Created - Recurso creado con éxito.
400 Bad Request - Parámetros faltantes o inválidos.
409 Conflict - Conflicto (como un duplicado).

PUT / PATCH
200 OK - Actualización exitosa.
400 Bad Request - Parámetros inválidos o incompletos.
404 Not Found - El recurso no se encuentra.
409 Conflict - Conflicto en la actualización del recurso.

DELETE
200 OK - Recurso eliminado exitosamente.
404 Not Found - El recurso no existe para eliminar.

### La movida de las rutas y su orden

En Express, las rutas se definen en el orden en que aparecen en el código.
Es importante tener en cuenta que las rutas son evaluadas de arriba a abajo, y Express intenta hacer coincidir la URL de la solicitud con la primera ruta que pueda.
Esto puede generar problemas si tienes rutas similares pero con parámetros, como por ejemplo `/:id`.

#### Ejemplo con rutas para usuarios

```js
router.get('/', getUsers); // Obtener todos los usuarios
router.get('/:id', getUserById); // Obtener usuario por ID
```

Si definimos primero la ruta más general (/), Express intentará hacer coincidir todas las solicitudes a esta ruta. Por ejemplo, si hacemos una solicitud GET a /usuarios/1, Express primero intentará hacer coincidir con la ruta / (ya que 1 es un segmento de la URL que podría coincidir con /). Esto significa que nunca llegaría a la ruta /:id, que está diseñada específicamente para obtener un usuario por su ID.

**¿Cómo solucionar esto?**

Para evitar este problema, debes definir primero las rutas más específicas (como /:id) y luego las rutas más generales (como /). Esto garantiza que las rutas más específicas se manejen primero, y las más generales solo se activarán si ninguna ruta más específica coincide.

La solución sería reorganizar las rutas de la siguiente manera:

```js
router.get('/:id', getUserById); // Obtener usuario por ID
router.get('/', getUsers); // Obtener todos los usuarios
```

De esta forma, Express evaluará primero la ruta con el parámetro :id y luego la ruta general /.

## Verbos HTTP y coincidencias de rutas

Es importante mencionar que Express genera las rutas basándose tanto en el verbo HTTP (GET, POST, PUT, DELETE, etc.) como en la ruta. Por ejemplo, las rutas:

```js
router.get('/', getUsers); // Obtener todos los usuarios
router.post('/', createUser); // Crear un nuevo usuario
```

Aunque ambas rutas son para /, una maneja solicitudes GET y la otra maneja solicitudes POST, lo que significa que no hay conflicto entre ellas. Express diferenciará estas rutas en función del verbo HTTP, por lo que las solicitudes GET y POST hacia / serán gestionadas por sus respectivas funciones.
