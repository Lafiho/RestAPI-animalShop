const express = require('express');
const db = require('./db');

const app = express();
app.use(express.json());

// GET všechna zvířata (včetně názvu kategorie)
app.get('/animals', (req, res) => {
  const stmt = db.prepare(`
    SELECT animals.id, animals.name, animals.price, animals.categoryId, categories.name as categoryName
    FROM animals
    LEFT JOIN categories ON animals.categoryId = categories.id
  `);
  const animals = stmt.all();
  res.json(animals);
});

// GET zvířata v konkrétní kategorii
app.get('/categories/:id/animals', (req, res) => {
  const stmt = db.prepare(`
    SELECT animals.id, animals.name, animals.price, animals.categoryId, categories.name as categoryName
    FROM animals
    LEFT JOIN categories ON animals.categoryId = categories.id
    WHERE animals.categoryId = ?
  `);
  const animals = stmt.all(req.params.id);
  res.json(animals);
});

// POST nové zvíře
app.post('/animals', (req, res) => {
  const { name, price, categoryId } = req.body;

  const category = db.prepare('SELECT * FROM categories WHERE id = ?').get(categoryId);
  if (!category) {
    return res.status(400).json({ message: 'Neexistující kategorie' });
  }

  const insert = db.prepare('INSERT INTO animals (name, price, categoryId) VALUES (?, ?, ?)');
  const info = insert.run(name, price, categoryId);

  const animal = db.prepare(`
    SELECT animals.id, animals.name, animals.price, categories.name as categoryName
    FROM animals
    JOIN categories ON animals.categoryId = categories.id
    WHERE animals.id = ?
  `).get(info.lastInsertRowid);

  res.status(201).json(animal);
});

// GET všechny kategorie
app.get('/categories', (req, res) => {
  const stmt = db.prepare('SELECT * FROM categories');
  res.json(stmt.all());
});

// POST nová kategorie
app.post('/categories', (req, res) => {
  const { name } = req.body;
  const insert = db.prepare('INSERT INTO categories (name) VALUES (?)');
  const info = insert.run(name);
  const newCategory = db.prepare('SELECT * FROM categories WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(newCategory);
});

app.listen(3000, () => {
  console.log('API běží na http://localhost:3000');
});
