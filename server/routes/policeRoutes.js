const express = require("express");
const router = express.Router();
const Police = require("../models/Police");

// Create a new police record
router.post("/police", async (req, res) => {
  try {
    const newPolice = new Police(req.body);
    const savedPolice = await newPolice.save();
    res.status(201).json(savedPolice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all police records
router.get("/police", async (req, res) => {
  try {
    const policeRecords = await Police.find();
    res.json(policeRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single police record by ID
router.get("/:id", async (req, res) => {
  try {
    const policeRecord = await Police.findById(req.params.id);
    if (!policeRecord) return res.status(404).json({ message: "Police record not found" });
    res.json(policeRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a police record by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedPolice = await Police.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedPolice) return res.status(404).json({ message: "Police record not found" });
    res.json(updatedPolice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a police record by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedPolice = await Police.findByIdAndDelete(req.params.id);
    if (!deletedPolice) return res.status(404).json({ message: "Police record not found" });
    res.json({ message: "Police record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
