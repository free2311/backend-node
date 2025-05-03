# Proyecto Backend

## Descripción
Este es un proyecto backend desarrollado con Node.js y TypeScript. Proporciona una API para manejar autenticación, eventos, facturación y búsquedas de GIFs, entre otras funcionalidades.

## Requisitos previos
- Node.js (versión 16 o superior)
- npm o yarn

## Instalación
1. Clona este repositorio.
2. Instala las dependencias ejecutando:
   ```bash
   npm install
   ```

# Scripts disponibles
- `npm run dev`: Inicia el servidor en modo desarrollo usando `nodemon`.

## Dependencias principales
- `express`: Framework para construir aplicaciones web.
- `axios`: Cliente HTTP para realizar solicitudes.
- `dotenv`: Manejo de variables de entorno.
- `mysql2`: Cliente MySQL para Node.js.
- `swagger-jsdoc` y `swagger-ui-express`: Documentación de API.

## Dependencias de desarrollo
- `typescript`: Soporte para TypeScript.
- `nodemon`: Reinicio automático del servidor durante el desarrollo.
- `prettier`: Formateo de código.

## Estructura del proyecto
```
index.ts
package.json
tsconfig.json
config/
  db.ts
controllers/
  authController.ts
  eventosController.ts
  factController.ts
middleware/
  authMiddleware.ts
routes/
  auth.ts
  eventos.ts
  fact.ts
  index.ts
  reservas.ts
services/
  authService.ts
  eventosService.ts
  factService.ts
  reservasService.ts
```

## Uso
1. Configura las variables de entorno en un archivo `.env`.
2. Inicia el servidor con:
   ```bash
   npm run dev
   ```
3. Accede a la API en `http://localhost:<puerto>`.

4. La Documentación se encuentra en la ruta raiz del proyecto

## Scripts de Base de Datos

A continuación, se presentan los scripts necesarios para la creación de la base de datos:

### Creación de la Base de Datos
```sql
CREATE DATABASE gif;
USE gif;
```

### Creación de la Tabla `gif_searches`
```sql
CREATE TABLE `gif_searches` (
  `id` int NOT NULL AUTO_INCREMENT,
  `search_date` datetime NOT NULL,
  `fact` text NOT NULL,
  `query` varchar(255) NOT NULL,
  `gif_url` text NOT NULL,
  PRIMARY KEY (`id`)
);
```

## Licencia
Este proyecto está bajo la licencia ISC.