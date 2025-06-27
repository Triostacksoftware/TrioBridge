import express from "express";
import Suggestion from "../models/Suggestion.js";
import { viewSuggestions } from "../controllers/suggestionController.js";
const router = express.Router();

router.get("/view", viewSuggestions);
router.post("/add", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const newSuggestion = new Suggestion({ message });
    await newSuggestion.save();
    res.status(201).json({ success: true, suggestion: newSuggestion });
  } catch (err) {
    console.error("Error saving suggestion:", err);
    res.status(500).json({ error: "Server error" });
  }
});
export default router;
