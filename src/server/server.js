// Aqui bascamente o servidor é inicializado.
// Ele importa o Express, as rotas e inicia a escuta na porta 3000

const express = require("express");
const routes = require("../routes/routes");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../config/swagger");

const app = express();

app.use(express.json());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(routes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});
