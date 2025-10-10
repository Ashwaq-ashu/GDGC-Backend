import express from "express";
import Form from "../models/Form.js";

const router = express.Router();

// POST: Save form data
router.post("/", async (req, res) => {
  try {
    const newApp = new Form(req.body);
    await newApp.save();
    res.status(201).json({ success: true, data: newApp });
  } catch (err) {
    console.error("Error saving application:", err);
    res.status(400).json({ success: false, error: err.message });
  }
});

// (Optional) GET: Fetch all applications
router.get("/", async (req, res) => {
  try {
    const applications = await Form.find();
    res.json(applications);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
