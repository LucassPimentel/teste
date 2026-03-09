// Por motivos de simplicidade, resolvi criar o banco de dados em memória para facilitar os testes práticos da API 
// Mas os scripts de criação das tabelas estão em ./scripts.sql para facilitar a migração para um banco de dados persistente

const Database = require('better-sqlite3');

function createDb() {

  const db = new Database(':memory:');

  db.pragma('foreign_keys = ON');

  db.exec(`
    CREATE TABLE "Order" (
      OrderId TEXT PRIMARY KEY,
      Value NUMERIC NOT NULL,
      CreationDate TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE Items (
      ItemId INTEGER PRIMARY KEY AUTOINCREMENT,
      ProductId INTEGER NOT NULL,
      Quantity INTEGER NOT NULL,
      Price NUMERIC NOT NULL,
      OrderId TEXT NOT NULL,
      FOREIGN KEY (OrderId) REFERENCES "Order"(OrderId) ON DELETE CASCADE
    );
  `);

  return db;
}

module.exports = { createDb };