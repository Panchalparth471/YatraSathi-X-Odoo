const mongoose = require("mongoose");

const MechanicDetailSchema = new mongoose.Schema({
    phone: { type: String, required: true },                       // Renamed from phoneNumber to phone
    specialization: { type: String },                              // Previously "details"
    ownerName: { type: String, required: true },                   // Owner of the shop
    homeAddress: { type: String, required: true },                 // Home address of owner/mechanic
    branch: { type: String, required: true },                      // Branch name or code
    branchAddress: { type: String, required: true },               // Address of the shop/branch
    legalNumber: { type: String, required: true, unique: true },   // Legal registration number
    workingHours: { type: String, required: true }                 // Example: "9 AM - 6 PM"
}, { timestamps: true });

module.exports = mongoose.model("MechanicDetail", MechanicDetailSchema);
