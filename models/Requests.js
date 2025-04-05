const mongoose = require('mongoose');
const RequestsSchema = new mongoose.Schema({
    details: 
    {
        type: String,
        required: true
    },

    clientIssueType: 
    {
        type: String,
        required: true
    },

    clientLocation: 
    {
        type: String,
        required: true
    },

    VehicleDetails: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleDetails",
    },

    Location: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Location",
    }, 

    MechanicDetails: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "MechanicDetails",
    }
});

module.exports = mongoose.model('Requests', RequestsSchema);

/*
status: pending or completed
*/