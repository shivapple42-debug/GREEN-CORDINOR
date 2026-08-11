const mongoose = require("mongoose");
const policeSchema = new mongoose.Schema({
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
  department: {
    type: String,
    required: [true, "Department required"],
    enum: {
      values: ["Traffic", "Criminal", "Cyber", "Crime Branch", "Community Policing", "Other"],
      message: "Invalid department"
    }
  },
  rank: {
    type: String,
    enum: {
      values: ["Constable", "Head Constable", "Sub Inspector", "Inspector", "Senior Inspector"],
      message: "Invalid rank"
    },
    default: "Constable"
  },
  station: {
    type: String,
    required: false
  }
});

export default mongoose.model("Police", policeSchema);
