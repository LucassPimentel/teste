// Aqui as rotas são mapeadas para os métodos da controller, ou seja, cada rota é associada
// a um método especifico que vai lidar com a logica relacionada aquela rota.

const { Router } = require("express");
const OrderController = require("../controllers/order.controller");
const { postOrderSchema, putOrderSchema } = require("../schemas/order.schema");
const validate = require("../middlewares/validate");

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Item:
 *       type: object
 *       required:
 *         - idItem
 *         - quantidadeItem
 *         - valorItem
 *       properties:
 *         idItem:
 *           type: string
 *           description: ID do produto
 *         quantidadeItem:
 *           type: integer
 *           description: Quantidade do item
 *         valorItem:
 *           type: number
 *           description: Preço do item
 *     Order:
 *       type: object
 *       required:
 *         - numeroPedido
 *         - valorTotal
 *         - dataCriacao
 *         - items
 *       properties:
 *         numeroPedido:
 *           type: string
 *           description: Número do pedido
 *         valorTotal:
 *           type: number
 *           description: Valor total do pedido
 *         dataCriacao:
 *           type: string
 *           format: date-time
 *           description: Data de criação
 *         items:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Item'
 */

/**
 * @swagger
 * /order:
 *   get:
 *     summary: Lista todos os pedidos
 *     tags: [Orders]
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Order'
 */
router.get("/", OrderController.list);

/**
 * @swagger
 * /order/{id}:
 *   get:
 *     summary: Busca pedido por ID
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     responses:
 *       200:
 *         description: Pedido encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 *       404:
 *         description: Pedido não encontrado
 */
router.get("/:id", OrderController.getById);

/**
 * @swagger
 * /order:
 *   post:
 *     summary: Cria um novo pedido
 *     tags: [Orders]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", validate(postOrderSchema), OrderController.create);

/**
 * @swagger
 * /order/{id}:
 *   put:
 *     summary: Atualiza um pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Pedido atualizado
 *       404:
 *         description: Pedido não encontrado
 */
router.put("/:id", validate(putOrderSchema), OrderController.update);

/**
 * @swagger
 * /order/{id}:
 *   delete:
 *     summary: Remove um pedido
 *     tags: [Orders]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido
 *     responses:
 *       204:
 *         description: Pedido removido
 *       404:
 *         description: Pedido não encontrado
 */
router.delete("/:id", OrderController.remove);

module.exports = router;
