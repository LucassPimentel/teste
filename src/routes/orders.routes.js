// Aqui as rotas são mapeadas para os métodos da controller, ou seja, cada rota é associada
// a um método especifico que vai lidar com a logica relacionada aquela rota.

const { Router } = require("express");
const OrderController = require("../controllers/order.controller");
const { orderSchema } = require("../schemas/order.schema");
const validate = require("../middlewares/validate");

const router = Router();

router.get("/", OrderController.list);
router.get("/:id", OrderController.getById);
router.post("/", validate(orderSchema), OrderController.create);

router.put("/:id", validate(orderSchema), OrderController.update);
router.delete("/:id", OrderController.remove);

module.exports = router;
