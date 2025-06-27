import express from "express";
import { createOrUpdateVideo, getAllVideos, updateVideoById, deleteVideoById } from "../controllers/videoController.js";
import { uploadNotes } from "../middleware/multerConfig.js";

const router = express.Router();

router.post("/add", uploadNotes, createOrUpdateVideo);
router.get("/view", getAllVideos);
router.put("/update/:id", uploadNotes, updateVideoById);
router.delete("/delete/:id", deleteVideoById);

export default router;