const mongoose = require("mongoose");

const WorkerInfoScehma = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: true, // true = active, false = not active
  },
  name: {
    type: String,
    required: [true, "Mechanic name is required"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    unique: true,
    trim: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("WorkerInfo", MechanicInfoSchema);
