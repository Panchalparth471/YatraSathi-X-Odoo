const mongoose = require('mongoose');
const VehicleDetailsSchema = new mongoose.Schema({
    vehicleType: {
        type: String,
        required: true,
        enum: ['Car', 'Motorcycle', 'Rickshaw', 'Truck', 'Bus', 'Van', 'Other']
    },
    vehicleCompany: {
        type: String,
        required: true
    },
    vehicleModel: {
        type: String,
        required: true
    },
    vehicleColour: {
        type: String,
        required: true
    },
    fuelType: {
        type: String,
        required: true,
        enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid']
    },
    numberPlate: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true });

module.exports = mongoose.model('VehicleDetails', VehicleDetailsSchema);