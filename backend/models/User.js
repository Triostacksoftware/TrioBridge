import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  role: String,
  documents: [String]
});

export default mongoose.model("User", userSchema);