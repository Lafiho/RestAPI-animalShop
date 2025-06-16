const express = require('express');
const app = express();
app.use(express.json());

// Simulovaná databáze
let animals = [
  { id: 1, name: 'Pes', price: 5000 },
  { id: 2, name: 'Kočka', price: 3000 }
];

// GET všechna zvířata
app.get('/animals', (req, res) => {
  res.json(animals);
});

// GET jedno zvíře podle ID
app.get('/animals/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const animal = animals.find(a => a.id === id);
  if (animal) {
    res.json(animal);
  } else {
    res.status(404).json({ message: 'Zvíře nenalezeno' });
  }
});

// POST - přidání nového zvířete
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

// Server na portu 3000
app.listen(3000, () => {
  console.log('API běží na http://localhost:3000');
});
