import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  title: String,
  type: String,
  link: String,
  notes: [String],
  category: String,
});

export default mongoose.model("Video", videoSchema);
