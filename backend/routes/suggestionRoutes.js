import express from "express";
import { viewSuggestions } from "../controllers/suggestionController.js";
const router = express.Router();

router.get("/view", viewSuggestions);
export default router;