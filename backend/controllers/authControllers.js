import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateToken } from "../utils/generateToken.js";

export const login = async (req, res) => {
  const { eid, password } = req.body;

  if (!eid || !password) {
    return res.status(400).json({ message: "EID and password are required" });
  }

  try {
    const user = await User.findOne({ eid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.password && !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = generateToken(user);

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 2 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "Login successful",
        role: user.role,
        name: user.name,
        eid: user.eid,
      });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
};

export const isLogin = (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return res.status(200).json(decoded);
  } catch {
    return res.status(403).json({ message: "Invalid token" });
  }
};
