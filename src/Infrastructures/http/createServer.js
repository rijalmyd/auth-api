import express from 'express';
import users from '../../Interfaces/http/api/users/index.js';
import authentications from '../../Interfaces/http/api/authentications/index.js';
import DomainErrorTranslator from '../../Commons/exceptions/DomainErrorTranslator.js';
import ClientError from '../../Commons/exceptions/ClientError.js';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Auth API Documentation',
      version: '1.0.0',
      description: 'Dokumentasi API pakai Swagger + Express',
    },
    servers: [
      { url: 'http://localhost:3000' }
    ],
  },
  apis: ['./src/Interfaces/http/api/**/*.js'] 
};
 
const openapiSpecification = swaggerJsDoc(swaggerOptions);

const createServer = async (container) => {
  const app = express();

  app.use(express.json());
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
  app.use('/', users(container));
  app.use('/', authentications(container));
  app.get('/', (req, res) => {
    res.status(200).json({ data: 'Hello Node.js!' });
  });

  app.use((req, res) => {
    res.status(404).json({
      status: 'fail',
      message: 'resource not found'
    });
  });
  app.use((err, req, res, _next) => {
    const translatedError = DomainErrorTranslator.translate(err);

    if (translatedError instanceof ClientError) {
      return res.status(translatedError.statusCode).json({
        status: 'fail',
        message: translatedError.message,
      });
    }

    return res.status(500).json({
      status: 'error',
      message: 'terjadi kegagalan pada server kami'
    });
  });

  return app;
};

export default createServer;