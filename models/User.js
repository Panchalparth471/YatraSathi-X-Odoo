const mongoose = require("mongoose")
const MechanicDetail = require("./MechanicDetail")
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
      enum: ["User", "Mechanic"],
      required: true,
    },
     
    VehicleDetails: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "VehicleDetails",
      }
   ],
   Requests:[
    {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Requests"
    }
   ] ,
   MechanicDetail:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"MechanicDetail"
   }
  }
)

module.exports = mongoose.model("User", userSchema)
