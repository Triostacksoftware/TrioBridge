import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    console.log("❌ No token in cookie");
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }
  try {
    // Log the token and secret
    console.log("🔐 Token received:", token);
    console.log("🔑 JWT_SECRET used:", process.env.JWT_SECRET);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("❌ JWT verification failed:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

export const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

export const isAuthor = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(403).json({ message: "Author access only" });
  }
  next();
};
