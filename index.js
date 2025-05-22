const express = require('express');
const app = express();

// Middleware pro parsování JSON požadavků
app.use(express.json());

// Nastavení správné hlavičky Content-Type s UTF-8 pro všechny odpovědi
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

// Simulovaná databáze zvířat
let animals = [
  { id: 1, name: 'Pes', price: 5000 },
  { id: 2, name: 'Kočka', price: 3000 }
];

// GET všech zvířat
app.get('/animals', (req, res) => {
  res.json(animals);
});

// GET jednoho zvířete podle ID
app.get('/animals/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const animal = animals.find(a => a.id === id);
  if (animal) {
    res.json(animal);
  } else {
    res.status(404).json({ message: 'Zvíře nenalezeno' });
  }
});

// POST – přidání nového zvířete
app.post('/animals', (req, res) => {
  const { name, price } = req.body;
  const newAnimal = {
    id: animals.length + 1,
    name,
    price
  };
  animals.push(newAnimal);
  res.status(201).json(newAnimal);
});

// Spuštění serveru na portu 3000
app.listen(3000, () => {
  console.log('API běží na http://localhost:3000');
});
