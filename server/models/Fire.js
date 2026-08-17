const mongoose = require("mongoose");

const fireStationSchema = new mongoose.Schema(
  {
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
      unique: true,
      lowercase: true,
      trim: true,
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
        values: [
          "Fire Suppression",
          "Rescue Operations",
          "Hazmat",
          "Fire Prevention",
          "Emergency Medical",
          "Other"
        ],
        message: "Invalid department"
      }
    },
    rank: {
      type: String,
      enum: {
        values: [
          "Firefighter",
          "Leading Firefighter",
          "Sub Officer",
          "Station Officer",
          "Divisional Officer",
          "Chief Fire Officer"
        ],
        message: "Invalid rank"
      },
      default: "Firefighter"
    },
    station: {
      type: String,
      default: ""
    },
    profile: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("FireStation", fireStationSchema);
