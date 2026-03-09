const orderRepository = require("../repositories/order.repository");
const { mapOrders } = require("../mapper/order.mapper");
const { NotFoundError, ConflictError } = require("../errors/appError");

function list() {
  const rows = orderRepository.findAll();
  return mapOrders(rows);
}

function getById(id) {
  const rows = orderRepository.findById(id);

  if (!rows || rows.length === 0) {
    throw new NotFoundError();
  }

  return mapOrders(rows);
}

function create(data) {
  const existingOrder = orderRepository.findById(data.numeroPedido);

  if (existingOrder.length > 0) {
    throw new ConflictError();
  }

  orderRepository.create(data);
  return data;
}

function update(id, data) {
  const result = orderRepository.update(id, data);

  if (!result) {
    throw new NotFoundError();
  }

  return data;
}

function remove(id) {
  const result = orderRepository.remove(id);

  if (result.changes === 0) {
    throw new NotFoundError();
  }
}

module.exports = { list, getById, create, update, remove };
