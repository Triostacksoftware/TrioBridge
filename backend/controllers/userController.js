import User from "../models/User.js";

// 🔘 Add User
export const addUser = async (req, res) => {
  try {
    const { eid, name, email, password, role, projects, review } = req.body;
    console.log(eid);
    const user = new User({
      eid,
      name,
      email,
      password,
      role,
      projects: projects || [],
      review,
      documents: req.files?.map((f) => f.filename) || [],
    });
    await user.save();
    res.status(201).json({ message: "User added successfully", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔘 Get All Users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔘 Update User by ID
export const updateUser = async (req, res) => {
  try {
    const allowedFields = [
      "eid",
      "name",
      "email",
      "password",
      "role",
      "projects",
      "review",
    ];
    const updates = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    if (req.files?.length) {
      updates.documents = req.files.map((f) => f.filename);
    }

    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });
    res.json({ message: "User updated", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// 🔘 Delete User by ID
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
