const orderService = require("../services/order.service");

function list(req, res) {
  const orders = orderService.list();
  res.json(orders);
}

function getById(req, res) {
  try {
    const orderById = orderService.getById(req.params.id.trim());
    return res.json(orderById);
  } catch (error) {
    handleError(res, error);
  }
}

function create(req, res) {
  try {
    const order = req.validatedData;
    var data = orderService.create(order);
    return res.status(201).json(data);
  } catch (error) {
    handleError(res, error);
  }
}

function update(req, res) {
  try {
    const id = req.params.id;
    const order = req.validatedData;
    const result = orderService.update(id, order);

    return res.status(200).json(result);
  } catch (error) {
    handleError(res, error);
  }
}

function remove(req, res) {
  try {
    const id = req.params.id;
    orderService.remove(id);

    return res.status(204).send();
  } catch (error) {
    handleError(res, error);
  }
}

function handleError(res, error) {
  if (error.message.includes("não encontrado")) {
    return res.status(404).json({ error: error.message });
  }
  return res.status(500).json({ error: "Erro interno do servidor" });
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
``;
