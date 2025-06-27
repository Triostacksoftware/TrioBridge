import Video from "../models/Video.js";
import fs from "fs";

export const createOrUpdateVideo = async (req, res) => {
  try {
    const { title, type, category } = req.body;
    const notes = req.files?.map(file => file.path) || [];
    const video = new Video({ title, type, category, notes });
    await video.save();
    res.json({ message: "Video added", video });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateVideoById = async (req, res) => {
  try {
    const { title, type, category } = req.body;
    const notes = req.files?.map(file => file.path);
    const existing = await Video.findById(req.params.id);
    if (!existing) return res.status(404).json({ error: "Video not found" });

    if (notes?.length) {
      existing.notes.forEach(p => fs.existsSync(p) && fs.unlinkSync(p));
      existing.notes = notes;
    }

    existing.title = title || existing.title;
    existing.type = type || existing.type;
    existing.category = category || existing.category;

    await existing.save();
    res.json({ message: "Video updated", video: existing });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteVideoById = async (req, res) => {
  try {
    const video = await Video.findByIdAndDelete(req.params.id);
    if (!video) return res.status(404).json({ error: "Video not found" });
    video.notes.forEach(path => fs.existsSync(path) && fs.unlinkSync(path));
    res.json({ message: "Video deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};