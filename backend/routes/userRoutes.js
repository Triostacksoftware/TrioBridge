import express from "express";
import { addUser, getAllUsers, updateUser, deleteUser } from "../controllers/userController.js";
import { uploadDocs } from "../middleware/multerConfig.js";

const router = express.Router();

router.post("/add", uploadDocs, addUser);
router.get("/view", getAllUsers);
router.put("/update/:id", uploadDocs, updateUser);
router.delete("/delete/:id", deleteUser);

export default router;