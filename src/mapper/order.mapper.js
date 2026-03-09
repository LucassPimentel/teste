function mapOrders(rows) {
  const ordersMap = {};

  rows.forEach((row) => {
    if (!ordersMap[row.OrderId]) {
      ordersMap[row.OrderId] = {
        OrderId: row.OrderId,
        Value: row.Value,
        CreationDate: row.CreationDate,
        items: [],
      };
    }

    ordersMap[row.OrderId].items.push({
      ProductId: row.ProductId,
      Quantity: row.Quantity,
      Price: row.Price,
    });
  });

  return Object.values(ordersMap);
}

module.exports = {
  mapOrders,
};
