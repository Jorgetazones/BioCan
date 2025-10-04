const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BioCan API',
      version: '1.0.0',
      description: 'API para gestionar productos y usuarios en BioCan',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./docs/.yaml'],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
