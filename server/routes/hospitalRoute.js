console.log("hospitalRoute LOADED ✅");
const express = require("express");
const router = express.Router();
const Hospital = require("../models/Hospital");

// Create a new hospital record
router.post("/", async (req, res) => {
  try {
    const newHospital = new Hospital(req.body);
    const savedHospital = await newHospital.save();
    res.status(201).json(savedHospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all hospital records
router.get("/", async (req, res) => {
  try {
    const hospitalRecords = await Hospital.find();
    res.json(hospitalRecords);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single hospital record by ID
router.get("/:idnumber", async (req, res) => {
  try {
    const hospitalRecord = await Hospital.findOne({ idnumber: req.params.idnumber });
    if (!hospitalRecord) return res.status(404).json({ message: "Hospital record not found" });
    res.json(hospitalRecord);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a hospital record by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedHospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedHospital) return res.status(404).json({ message: "Hospital record not found" });
    res.json(updatedHospital);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a hospital record by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedHospital = await Hospital.findByIdAndDelete(req.params.id);
    if (!deletedHospital) return res.status(404).json({ message: "Hospital record not found" });
    res.json({ message: "Hospital record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
