const express = require('express');
const bcrypt = require('bcryptjs');
const Worker = require('../models/Worker');

const router = express.Router();

// Middleware to handle errors
const handleError = (res, statusCode, message, error) => {
  console.error(error);
  return res.status(statusCode).json({ message, error: error.message });
};

// get all workers
router.get('/', async (req, res) => {
  try {
    console.log(new Date(), 'request incoming to - worker', req.route.stack[0].method, req.route.path);
    const workers = await Worker.find().populate('category');
    res.status(200).json({ message: 'success', workers });
  } catch (error) {
    handleError(res, 500, 'error getting workers', error);
  }
});

// get a specific worker
router.get('/:id', async (req, res) => {
  try {
    console.log(new Date(), 'request incoming to - worker', req.route.stack[0].method, req.route.path);
    const id = req.params.id;
    const worker = await Worker.findById(id).populate('category');

    if (worker) {
      res.status(200).json({ message: 'success', data: worker });
    } else {
      res.status(404).json({ message: 'worker not found' });
    }
  } catch (error) {
    handleError(res, 500, 'error getting worker by ID', error);
  }
});

// create a worker
router.post('/', async (req, res) => {
  try {
    console.log(new Date(), 'request incoming to - worker', req.route.stack[0].method, req.route.path);
    const existingWorker = await Worker.findOne({ name: req.body.name });

    if (existingWorker) {
      return res.status(409).json({ message: 'worker already exists' });
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const worker = await Worker.create({
      name: req.body.name,
      email: req.body.email,
      password,
      category: req.body.category,
      hourly_rate: req.body.hourly_rate,
    });

    res.status(201).json({ message: 'successfully created the worker', worker });
  } catch (error) {
    handleError(res, 500, 'error creating worker', error);
  }
});

// update a worker
router.patch('/', async (req, res) => {
  try {
    console.log(new Date(), 'request incoming to - worker', req.route.stack[0].method, req.route.path);
    const id = req.body.id;
    const data = req.body;

    if (req.body.password) {
      data.password = await bcrypt.hash(req.body.password, 10);
    }

    const worker = await Worker.findByIdAndUpdate(id, data, { new: true });

    if (worker) {
      res.status(200).json({ message: 'successfully updated!', worker });
    } else {
      res.status(404).json({ message: 'worker not found' });
    }
  } catch (error) {
    handleError(res, 500, 'error updating worker', error);
  }
});

// delete a worker
router.delete('/', async (req, res) => {
  try {
    console.log(new Date(), 'request incoming to - worker', req.route.stack[0].method, req.route.path);
    await Worker.findByIdAndDelete(req.body.id);
    res.status(200).json({ message: 'worker deleted' });
  } catch (error) {
    handleError(res, 500, 'error deleting the worker', error);
  }
});

module.exports = router;
