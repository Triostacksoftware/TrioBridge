import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  message: String,
  submittedBy: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Complaint", complaintSchema);