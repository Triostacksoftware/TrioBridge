import express from "express";
import { viewComplaints } from "../controllers/complaintController.js";
const router = express.Router();

router.get("/view", viewComplaints);
export default router;