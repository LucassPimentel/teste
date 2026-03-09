// Aqui as rotas são agrupadas, ou seja, aqui é o ponto de entrada para as rotas do projeto. 
// Dessa forma, quando for necessário adicionar uma nova rota,
// basta importar o arquivo da rota e usar o router.use() para adicioná-la ao grupo de rotas.

const { Router } = require('express');
const orderRoutes = require('./orders.routes');

const router = Router();

router.use('/order', orderRoutes);

module.exports = router;