import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";

// Routes
import userRoutes from "./routes/userRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import complaintRoutes from "./routes/complaintRoutes.js";
import suggestionRoutes from "./routes/suggestionRoutes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Allowed Frontend Origins
const allowedOrigins = [
  "http://localhost:3000",
  "https://triobridge.triostack.in",
  "https://www.triobridge.triostack.in",
];

// ✅ CORS Middleware (handles cross-domain cookies)
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

// ✅ Basic Middleware
app.use(cookieParser());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// ✅ API Routes
app.get("/", (req, res) => {
  res.json("Welcome to the API Section!");
});

app.use("/api/users", userRoutes);
app.use("/api/videos", videoRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/suggestions", suggestionRoutes);
app.use("/api/auth", authRoutes);

// ✅ Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ message: err.message || "Internal Server Error" });
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} in ${process.env.NODE_ENV}`)
);
