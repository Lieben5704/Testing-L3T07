const express = require('express');
const router = express.Router();
const Car = require('../models/car.model');

// GET all cars
router.get('/', async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific car by ID
router.get('/:id', getCar, (req, res) => {
  res.json(res.car);
});

router.post('/create', function(req, res) {
  let car = new Car({
    model: req.body.model,
    make: req.body.make,
    owner: req.body.owner,
    registration: req.body.registration,
    address: req.body.address
  });
  car.save()
    .then(car => {
      res.status(200).json({'car': 'Added successfully'});
    })
    .catch(err => {
      res.status(400).send('Failed to create new car document');
    });
});


// POST a new car
router.post('/', async (req, res) => {
  const car = new Car({
    model: req.body.model,
    make: req.body.make,
    owner: req.body.owner,
    registration: req.body.registration,
    address: req.body.address
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) a specific car by ID
router.put('/:id', getCar, async (req, res) => {
  if (req.body.model != null) {
    res.car.model = req.body.model;
  }
  if (req.body.make != null) {
    res.car.make = req.body.make;
  }
  if (req.body.owner != null) {
    res.car.owner = req.body.owner;
  }
  if (req.body.registration != null) {
    res.car.registration = req.body.registration;
  }
  if (req.body.address != null) {
    res.car.address = req.body.address;
  }

  try {
    const updatedCar = await res.car.save();
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a specific car by ID
router.delete('/:id', getCar, async (req, res) => {
  try {
    await res.car.remove();
    res.json({ message: 'Car deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a specific car by ID
async function getCar(req, res, next) {
  try {
    car = await Car.findById(req.params.id);
    if (car == null) {
      return res.status(404).json({ message: 'Cannot find car' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.car = car;
  next();
}

module.exports = router;
