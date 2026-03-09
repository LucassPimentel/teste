const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Orders API",
      version: "1.0.0",
      description: "API de teste Jitterbit - CRUD de Pedidos",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
  },
  apis: ["./src/routes/orders.routes.js"],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
