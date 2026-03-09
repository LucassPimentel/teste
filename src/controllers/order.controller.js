const { createDb } = require("../data/database");
const { mapOrders } = require("../mapper/order.mapper");

const db = createDb();
const ORDER_QUERY = `SELECT 
      O.OrderId,
      O.Value,
      O.CreationDate, 
      I.ProductId,
      I.Quantity,
      I.Price
      FROM "Order" O INNER JOIN Items I ON I.OrderId = O.OrderId`;

function list(req, res) {
  const rows = db.prepare(ORDER_QUERY).all();

  res.json(mapOrders(rows));
}

function getById(req, res) {
  const orderById = db
    .prepare(ORDER_QUERY + " WHERE O.OrderId = ?")
    .all(req.params.id);

  if (!orderById)
    return res.status(404).json({ error: "Pedido não encontrado" });

  return res.json(mapOrders(orderById));
}

function create(req, res) {
  const data = req.validatedData;

  const insertOrder = db.prepare(
    'INSERT INTO "Order" (OrderId, Value, CreationDate) VALUES (?, ?, ?)'
  );
  const insertItem = db.prepare(
    "INSERT INTO Items (ProductId, Quantity, Price, OrderId) VALUES (?, ?, ?, ?)"
  );

  const transaction = db.transaction((order) => {
    insertOrder.run(
      order.numeroPedido.trim(),
      order.valorTotal,
      order.dataCriacao.toISOString()
    );

    for (const item of order.items) {
      insertItem.run(
        item.idItem.trim(),
        item.quantidadeItem,
        item.valorItem,
        order.numeroPedido.trim()
      );
    }
  });

  transaction(data);

  return res.status(201).json(data);
}

function update(req, res) {
  try {
    const id = req.params.id;
    const data = req.validatedData;

    const updateOrder = db.prepare(
      'UPDATE "Order" SET Value = ?, CreationDate = ? WHERE OrderId = ?'
    );

    const insertItem = db.prepare(
      "INSERT INTO Items (ProductId, Quantity, Price, OrderId) VALUES (?, ?, ?, ?)"
    );

    const deleteItems = db.prepare("DELETE FROM Items WHERE OrderId = ?");

    const transaction = db.transaction((order) => {
      var updateResult = updateOrder.run(
        order.valorTotal,
        order.dataCriacao.toISOString(),
        id.trim()
      );

      if (updateResult.changes === 0) throw new Error("Pedido não encontrado");

      deleteItems.run(id.trim());

      for (const item of order.items) {
        insertItem.run(
          item.idItem.trim(),
          item.quantidadeItem,
          item.valorItem,
          id.trim()
        );
      }
    });

    transaction(data);

    return res.status(200).json(data);
  } catch (error) {
    if (error.message === "Pedido não encontrado") {
      return res.status(404).json({ error: error.message });
    }
    return res.status(500).json({ error: "Erro interno do servidor" });
  }
}

function remove(req, res) {
  throw new Error("Not implemented");
}

module.exports = {
  list,
  getById,
  create,
  update,
  remove,
};
``;
