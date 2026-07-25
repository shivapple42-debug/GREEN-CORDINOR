const express = require("express");
const router = express.Router();
const User = require("../models/User");

//REGISTER ROUTE
router.post("/register", async (req, res) => {
  try {
    const { name, phone, email, password, department } = req.body;

    const existingUser = await User.findOne({ email: email.trim().toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const newUser = new User({
      name,
      phone,
      email: email.trim().toLowerCase(),
      password, // Original password
      department,
      isApproved: false,
      status: "pending",
    });

    await newUser.save();
    return res.status(201).json({ message: "Request submitted successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//ADMIN GET ALL REQUESTS
router.get("/admin/requests", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    return res.status(200).json(users);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

//ADMIN RQUEST APPROVER PANEL
router.put("/admin/update-status/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const isApproved = status === "approved";

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { status, isApproved },
      { new: true }
    );

    return res.status(200).json({ message: `Status updated to ${status}`, user: updatedUser });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

// USER LOGIN
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    if (!user.isApproved || user.status !== "approved") {
      return res.status(400).json({ message: "Your request is pending admin approval!" });
    }

    return res.status(200).json({
      token: "dummy-jwt-token",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        department: user.department,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

module.exports = router;
