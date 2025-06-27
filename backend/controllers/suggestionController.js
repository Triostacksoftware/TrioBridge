import Suggestion from "../models/Suggestion.js";

export const viewSuggestions = async (req, res) => {
  try {
    const data = await Suggestion.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};