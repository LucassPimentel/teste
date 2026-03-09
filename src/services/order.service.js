const orderRepository = require("../repositories/order.repository");
const { mapOrders } = require("../mapper/order.mapper");

const NOT_FOUND_ERROR = "Pedido não encontrado";

function list() {
  const rows = orderRepository.findAll();
  return mapOrders(rows);
}

function getById(id) {
  const rows = orderRepository.findById(id);

  if (!rows || rows.length === 0) {
    throw new Error(NOT_FOUND_ERROR);
  }

  return mapOrders(rows);
}

function create(data) {
  orderRepository.create(data);
  return data;
}

function update(id, data) {
  const result = orderRepository.update(id, data);

  if (!result) {
    throw new Error(NOT_FOUND_ERROR);
  }

  return data;
}

function remove(id) {
  const result = orderRepository.remove(id);

  if (result.changes === 0) {
    throw new Error(NOT_FOUND_ERROR);
  }
}

module.exports = { list, getById, create, update, remove };
