console.log("fireRoute LOADED ✅");
const express = require("express");
const router = express.Router();
const FireStation = require("../models/Fire");

// Create a new Fire Station record
router.post("/", async (req, res) => {
  try {
    const newFireStation = new FireStation(req.body);
    const savedFireStation = await newFireStation.save();
    res.status(201).json(savedFireStation);
  } catch (error) {
    console.error("Fire POST Error:", error);
    
    // Duplicate Key Error (Unique constraints)
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Duplicate entry error",
        fields: error.keyValue
      });
    }

    res.status(400).json({ message: error.message, error });
  }
});

// Get all Fire Station records
router.get("/", async (req, res) => {
  try {
    const fireRecords = await FireStation.find();
    res.json(fireRecords);
  } catch (error) {
    console.error("🔥 Fire GET Error:", error);
    res.status(500).json({ message: error.message });
  }
});

// Get a single Fire Station record by idnumber (Custom ID Field)
router.get("/:idnumber", async (req, res) => {
  try {
    const fireRecord = await FireStation.findOne({ 
      idnumber: req.params.idnumber 
    });

    if (!fireRecord) {
      return res.status(404).json({ message: "Fire Station record not found" });
    }

    res.json(fireRecord);
  } catch (error) {
    console.error("Error fetching by idnumber:", error);
    res.status(500).json({ message: error.message });
  }
});

// Update a Fire Station record by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedFireStation = await FireStation.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFireStation) {
      return res.status(404).json({ message: "Fire Station record not found" });
    }
    res.json(updatedFireStation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a Fire Station record by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedFireStation = await FireStation.findByIdAndDelete(req.params.id);
    if (!deletedFireStation) {
      return res.status(404).json({ message: "Fire Station record not found" });
    }
    res.json({ message: "Fire Station record deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
