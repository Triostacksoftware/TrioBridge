import User from "../models/User.js";

export const addUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;
    const user = new User({ name, email, role, documents: req.files?.map(f => f.path) || [] });
    await user.save();
    res.json({ message: "User added", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const allowedFields = ["name", "email", "role", "documents"];
    const updates = {};
    allowedFields.forEach(field => {
      if (req.body[field]) updates[field] = req.body[field];
    });
    if (req.files?.length) updates.documents = req.files.map(f => f.path);
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};