import Complaint from "../models/Complaint.js";

export const viewComplaints = async (req, res) => {
  try {
    const data = await Complaint.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};