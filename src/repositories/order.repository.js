// repositories/order.repository.js
const { createDb } = require("../data/database");

const db = createDb();

const ORDER_QUERY = `SELECT 
  O.OrderId,
  O.Value,
  O.CreationDate, 
  I.ProductId,
  I.Quantity,
  I.Price
  FROM "Order" O INNER JOIN Items I ON I.OrderId = O.OrderId`;

function findAll() {
  return db.prepare(ORDER_QUERY).all();
}

function findById(id) {
  return db.prepare(ORDER_QUERY + " WHERE O.OrderId = ?").all(id);
}

function create(order) {
  const insertOrder = db.prepare(
    'INSERT INTO "Order" (OrderId, Value, CreationDate) VALUES (?, ?, ?)'
  );
  const insertItem = db.prepare(
    "INSERT INTO Items (ProductId, Quantity, Price, OrderId) VALUES (?, ?, ?, ?)"
  );

  const transaction = db.transaction((data) => {
    insertOrder.run(
      data.numeroPedido.trim(),
      data.valorTotal,
      data.dataCriacao.toISOString()
    );

    for (const item of data.items) {
      insertItem.run(
        item.idItem.trim(),
        item.quantidadeItem,
        item.valorItem,
        data.numeroPedido.trim()
      );
    }
  });

  transaction(order);
}

function update(id, order) {
  const updateOrder = db.prepare(
    'UPDATE "Order" SET Value = ?, CreationDate = ? WHERE OrderId = ?'
  );
  const insertItem = db.prepare(
    "INSERT INTO Items (ProductId, Quantity, Price, OrderId) VALUES (?, ?, ?, ?)"
  );
  const deleteItems = db.prepare("DELETE FROM Items WHERE OrderId = ?");

  const transaction = db.transaction((data) => {
    const result = updateOrder.run(
      data.valorTotal,
      data.dataCriacao.toISOString(),
      id.trim()
    );

    if (result.changes === 0) return null;

    deleteItems.run(id.trim());

    for (const item of data.items) {
      insertItem.run(
        item.idItem.trim(),
        item.quantidadeItem,
        item.valorItem,
        id.trim()
      );
    }

    return result;
  });

  return transaction(order);
}

function remove(id) {
  const deleteOrder = db.prepare('DELETE FROM "Order" WHERE OrderId = ?');
  return deleteOrder.run(id.trim());
}

module.exports = { findAll, findById, create, update, remove };
