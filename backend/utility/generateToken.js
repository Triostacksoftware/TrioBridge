import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  return jwt.sign(
    {
      eid: user.eid,
      name: user.name,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "2h" } // Set token to expire in 2 hours
  );
};
