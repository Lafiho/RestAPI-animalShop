const Database = require('better-sqlite3');
const db = new Database('animals.db');

// Inicializace tabulek
db.exec(`
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );
  
  CREATE TABLE IF NOT EXISTS animals (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price INTEGER NOT NULL,
    categoryId INTEGER,
    FOREIGN KEY (categoryId) REFERENCES categories(id)
  );
`);

module.exports = db;
