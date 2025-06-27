"use client";
import React, { useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

export default function UserForm() {
  const [form, setForm] = useState({
    eid: "",
    name: "",
    email: "",
    password: "",
    role: "",
    review: "",
    projects: "",
    documents: [],
  });

  const [mode, setMode] = useState("add");
  const [userId, setUserId] = useState("");

  const handleEIDSearch = async () => {
    if (!form.eid.trim()) return alert("Enter a valid EID");
    try {
      const res = await fetch(`${API_URL}api/users/view`);
      const data = await res.json();

      const found = data.find((u) => u.eid === form.eid);
      if (!found) return alert("No user found with this EID");

      setForm({
        eid: found.eid,
        name: found.name || "",
        email: found.email || "",
        password: "",
        role: found.role || "",
        review: found.review || "",
        projects: found.projects?.join(", ") || "",
        documents: [],
      });

      setUserId(found._id);
      setMode("edit");
    } catch (err) {
      console.error("Fetch error", err);
      alert("Could not search user.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      if (key === "documents" && value.length > 0) {
        Array.from(value).forEach((file) => formData.append("documents", file));
      } else if (key === "projects") {
        formData.append(
          key,
          JSON.stringify(value.split(",").map((s) => s.trim()))
        );
      } else {
        formData.append(key, value);
      }
    });

    const endpoint =
      mode === "edit"
        ? `${API_URL}api/users/update/${userId}`
        : `${API_URL}api/users/add`;

    const res = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    if (res.ok) {
      alert(mode === "edit" ? "User updated successfully!" : "User added!");
      setForm({
        eid: "",
        name: "",
        email: "",
        password: "",
        role: "",
        review: "",
        projects: "",
        documents: [],
      });
      setMode("add");
    } else {
      alert("Error: " + (data?.error || "Unknown error"));
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto bg-white shadow p-6 rounded-xl">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Search by EID"
          value={form.eid}
          onChange={(e) => setForm({ ...form, eid: e.target.value })}
          className="w-full px-4 py-2 border rounded-md"
        />
        <button
          onClick={handleEIDSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded-md"
        >
          Find
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="password"
          placeholder="Password (optional)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Role"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
          className="w-full px-4 py-2 border rounded-md"
        />
        <textarea
          placeholder="Review"
          value={form.review}
          onChange={(e) => setForm({ ...form, review: e.target.value })}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Projects (comma separated)"
          value={form.projects}
          onChange={(e) => setForm({ ...form, projects: e.target.value })}
          className="w-full px-4 py-2 border rounded-md"
        />
        <input
          type="file"
          multiple
          onChange={(e) =>
            setForm({ ...form, documents: e.target.files || [] })
          }
          className="w-full"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md"
        >
          {mode === "edit" ? "Update User" : "Add User"}
        </button>
      </form>
    </div>
  );
}
