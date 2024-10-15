// routes.js
import express from 'express';
import Vehicle from '../models/vehicles.models.js';
import EntryLog from '../models/entry.models.js';
import User from '../models/users.models.js';

const router = express.Router();

// 1. Create a User
router.post('/users', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    const newUser = new User({ username, password, role });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 2. Get all Vehicles
router.get('/vehicles', async (req, res) => {
  try {
    const vehicles = await Vehicle.find().populate('owner');
    res.json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3. Create a Vehicle
router.post('/vehicles', async (req, res) => {
  const { owner, numberPlate, guest } = req.body;

  try {
    const newVehicle = new Vehicle({ owner, numberPlate, guest });
    await newVehicle.save();
    res.status(201).json(newVehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 4. Create an Entry Log
router.post('/entry-logs', async (req, res) => {
  const { vehicle, entryTime, exitTime } = req.body;

  try {
    const newEntryLog = new EntryLog({ vehicle, entryTime, exitTime });
    await newEntryLog.save();
    res.status(201).json(newEntryLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 5. Get Entry Logs
router.get('/entry-logs', async (req, res) => {
  try {
    const entryLogs = await EntryLog.find().populate('vehicle');
    res.json(entryLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
