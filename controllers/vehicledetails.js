const express = require('express');
const router = express.Router();
const VehicleDetails = require('../models/VehicleDetails'); // Adjust path if needed

// Create a new vehicle detail
router.post('/vehicles', async (req, res) => {
    try {
        const vehicle = new VehicleDetails(req.body);
        await vehicle.save();
        res.status(201).json({ message: 'Vehicle details added successfully', vehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error adding vehicle details', error: error.message });
    }
});

// Get all vehicles
router.get('/vehicles', async (req, res) => {
    try {
        const vehicles = await VehicleDetails.find();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicle details', error: error.message });
    }
});

// Get a vehicle by ID
router.get('/vehicles/:id', async (req, res) => {
    try {
        const vehicle = await VehicleDetails.findById(req.params.id);
        if (!vehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json(vehicle);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching vehicle', error: error.message });
    }
});

// Update vehicle details
router.put('/vehicles/:id', async (req, res) => {
    try {
        const updatedVehicle = await VehicleDetails.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedVehicle) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json({ message: 'Vehicle updated successfully', updatedVehicle });
    } catch (error) {
        res.status(500).json({ message: 'Error updating vehicle', error: error.message });
    }
});

// Delete a vehicle
router.delete('/vehicles/:id', async (req, res) => {
    try {
        const deleted = await VehicleDetails.findByIdAndDelete(req.params.id);
        if (!deleted) return res.status(404).json({ message: 'Vehicle not found' });
        res.status(200).json({ message: 'Vehicle deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting vehicle', error: error.message });
    }
});

module.exports = router;
