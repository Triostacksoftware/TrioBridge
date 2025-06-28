import express from "express";
import { login, logout, isLogin } from "../controllers/authControllers.js";
import { verifyToken, isAdmin, isAuthor } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/logout", logout);
router.get("/isLogin", isLogin);

// Example protected routes
router.get("/isadmin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Admin", user: req.user });
});

router.get("/isUser", verifyToken, isAuthor, (req, res) => {
  res.json({ message: "User", user: req.user });
});

export default router;
