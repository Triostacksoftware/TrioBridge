// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  eid: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, // optional, for interns may not need password
  projects: [{ type: String }],
  review: { type: String },
  role: { type: String },
  documents: [{ type: String }],
});

export default mongoose.model("User", userSchema);
