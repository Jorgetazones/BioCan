# Biocan

## Colores

Colres principlaes

#f3ede1
#215431
#4E6E5D
#33754B
#28A745
#F5F5F5

## Buenas prácticas

# FRONT: React | Vite | TypeScript | Redux Toolkit | MUI

Rutas públicas y privadas protegidas con login (Usuario normal, Vendedor y SuperAdmin)
Revisión del responsive para que la aplicación se vea bien en cualquier pantalla y los usuarios puedan operar con ella
Organización de componentes usando DDD --> Domain driven design (organización por funcionalidades: pedidos, usuarios, productos, etc)

# BACKEND: NodeJs | Express | Sequelize | MySQL

CORS: Protección de peticiones de tan solo dominios permitidos
Modelo vista controlador para organizar código
Sesiones protegidas con Json Web Token con el id del usuario que hace las peticiones
Configuración de log para guardar las peticiones hechas y poder revisar posibles errores
Datos confidenciales guardados en ficheros de entorno.
Contraseñas de usuarios hasheadas de forma unidireccional (aunque roben la bbdd no pueden descrifrarlas).

Protección de la API protegiendo las cabeceras http (usando helmet) y revisión de la cantidad de peticiones por usuario en determinado tiempo.
Patrón de diseño "Singleton" para gestionar la conexión a la base de datos -> Solo se conecta a la base de datos desde un único fichero / punto de entrada, evitando código repetido y siendo más fácil depurar si hubiera errores de conexión.
