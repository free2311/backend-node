import express from 'express';
import routes from './routes';
import cors from 'cors';

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Configuración de CORS
const corsOptions = {
  origin: '*', // Permitir todas las solicitudes de origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Encabezados permitidos
};
app.use(cors(corsOptions));

// Usar rutas centralizadas
app.use('/', routes);

// Configuración de Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend API',
      version: '1.0.0',
      description: 'Documentación de la API del backend',
    },
  },
  apis: ['./src/routes/*.ts'], // Corregido para apuntar a los archivos de rutas
};

import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(port, () => {
  console.log(`Server running on route http://localhost:${port}`);
});

export default app;
