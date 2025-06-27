import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import suggestionRoutes from "./routes/suggestionRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to the API Section!");
});
app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/suggestions", suggestionRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
