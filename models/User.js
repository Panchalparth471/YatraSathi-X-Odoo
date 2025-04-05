const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const WorkerInfoSchema = new mongoose.Schema({
  isActive: {
    type: Boolean,
    default: true,
  },
  name: {
    type: String,
    required: [true, "Worker name is required"],
    trim: true,
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    trim: true,
  },
}, { _id: false }); // disable _id for subdocs if not needed

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
  },
  token: {
    type: String,
  },
  resetPasswordExpires: {
    type: Date,
  },
  accountType: {
    type: String,
    enum: ["User", "Mechanic", "Worker"],
    required: true,
  },
  uniqueToken: {
    type: String,
    unique: true,
    sparse: true,
  },
  VehicleDetails: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "VehicleDetails",
    },
  ],
  Requests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Requests",
    },
  ],
  OwnerDetail: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "OwnerDetail",
  },

  // 👇 Add array of WorkerInfo for Mechanics only
  workers: [WorkerInfoSchema],

}, { timestamps: true });

// Pre-save hook to auto-generate unique token if accountType is Mechanic
userSchema.pre("save", function (next) {
  if (this.accountType === "Mechanic" && !this.uniqueToken) {
    this.uniqueToken = uuidv4();
  }
  next();
});

module.exports = mongoose.model("User", userSchema);
