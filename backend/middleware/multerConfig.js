import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();

// 📁 Ensure the 'uploads' directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 🚀 Serve uploaded files statically
app.use("/uploads", express.static(uploadDir));

// 🧩 Multer Storage Configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// 🎯 Export Upload Middlewares
export const uploadDocs = multer({ storage }).array("documents", 5);
export const uploadNotes = multer({ storage }).array("notes", 5);
