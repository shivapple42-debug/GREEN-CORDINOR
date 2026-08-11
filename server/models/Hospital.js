const mongoose = require("mongoose");

const hospitalSchema = new mongoose.Schema({
  idnumber: {
    type: Number,
    required: [true, "ID number required"],
    unique: true
  },
  name: {
    type: String,
    required: [true, "Name required"],
    trim: true,
    minlength: [3, "Name must be at least 3 characters"]
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: [true, "Email already registered"],
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter valid email"
    ]
  },
  address: {
    type: String,
    required: [true, "Address required"],
    minlength: [5, "Address must be at least 5 characters"]
  },
  phone: {
    type: String,
    required: [true, "Phone required"],
    unique: [true, "Phone already registered"],
    match: [/^[0-9]{10}$/, "Please enter valid 10-digit phone number"]
  },
  password: {
    type: String,
    required: [true, "Password required"],
    minlength: [6, "Password must be at least 6 characters"]
  },
  licenseNumber: {
    type: String,
    required: [true, "License number required"],
    unique: true,
    trim: true
  },
  hospitalType: {
    type: String,
    required: [true, "Hospital type required"],
    enum: {
      values: ["Government", "Private", "Trust", "Multi-Specialty", "General"],
      message: "Invalid hospital type"
    }
  },
  coveredArea: {
    type: [String],
    required: [true, "Covered area required"]
  },
  bedsAvailable: {
    type: Number,
    default: 0,
    min: [0, "Beds available cannot be negative"]
  },
  emergencyContact: {
    type: String,
    match: [/^[0-9]{10}$/, "Please enter valid 10-digit emergency contact number"]
  },
  hasAmbulance: {
    type: Boolean,
    default: false
  },
  profile: {
    type: String,
    required: false,
    default: ""
  }
});

export default mongoose.model("Hospital", hospitalSchema);
