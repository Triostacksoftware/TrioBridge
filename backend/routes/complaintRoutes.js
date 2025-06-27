import express from "express";
import Complaint from "../models/Complaint.js";
import { viewComplaints } from "../controllers/complaintController.js";
const router = express.Router();

router.get("/view", viewComplaints);
router.post("/add", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const newComplaint = new Complaint({ message });
    await newComplaint.save();
    res.status(201).json({ success: true, complaint: newComplaint });
  } catch (err) {
    console.error("Error saving complaint:", err);
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
