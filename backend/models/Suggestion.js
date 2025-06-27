import mongoose from "mongoose";

const suggestionSchema = new mongoose.Schema({
  message: String,
  submittedBy: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Suggestion", suggestionSchema);