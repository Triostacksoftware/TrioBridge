"use client";
import React, { useState } from "react";
import {
  FaVideo,
  FaUsers,
  FaRegCommentDots,
  FaLightbulb,
} from "react-icons/fa";
import {
  MdOutlineAddCircleOutline,
  MdOutlineViewList,
  MdEdit,
} from "react-icons/md";

const AdminDashboard = () => {
  const [tab, setTab] = useState("videos");
  const [subTab, setSubTab] = useState("add");
  const [videoForm, setVideoForm] = useState({
    title: "",
    type: "",
    category: "",
    notes: [],
  });
  const handleVideoSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", videoForm.title);
    formData.append("type", videoForm.type);
    formData.append("category", videoForm.category);

    if (videoForm.notes && videoForm.notes.length > 0) {
      Array.from(videoForm.notes).forEach((file) => {
        formData.append("notes", file);
      });
    }

    try {
      const response = await fetch("http://localhost:8080/api/videos", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Video added successfully!");
        setVideoForm({ title: "", type: "", category: "", notes: [] });
      } else {
        alert("Error: " + data?.error || "Something went wrong");
      }
    } catch (error) {
      console.error("Error uploading video:", error);
      alert("Upload failed.");
    }
  };

  const renderSubContent = () => {
    if (tab === "videos") {
      if (subTab === "add")
        return (
          <form
            onSubmit={handleVideoSubmit}
            className="space-y-4 text-left max-w-md mx-auto"
          >
            <label className="block">
              <span className="text-gray-700">Title</span>
              <input
                type="text"
                value={videoForm.title}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, title: e.target.value })
                }
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                required
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Type</span>
              <input
                type="text"
                value={videoForm.type}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, type: e.target.value })
                }
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Category</span>
              <input
                type="text"
                value={videoForm.category}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, category: e.target.value })
                }
                className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Notes (Upload multiple)</span>
              <input
                type="file"
                multiple
                onChange={(e) =>
                  setVideoForm({ ...videoForm, notes: e.target.files })
                }
                className="mt-1 block w-full"
              />
            </label>

            <button
              type="submit"
              className="w-full bg-[#3b5bdd] text-white py-2 rounded-md hover:bg-[#2c45b7]"
            >
              Submit
            </button>
          </form>
        );
      if (subTab === "view") return <p>List of uploaded videos.</p>;
    }

    if (tab === "users") {
      if (subTab === "add") return <p>Add a new user to the system.</p>;
      if (subTab === "view") return <p>Manage and view users.</p>;
      if (subTab === "update") return <p>Update user info here.</p>;
    }

    if (tab === "complaints") return <p>View and resolve complaints here.</p>;
    if (tab === "suggestions")
      return <p>Read suggestions submitted by team members.</p>;

    return null;
  };

  const renderSubTabs = () => {
    if (tab === "videos") {
      return (
        <div className="flex justify-center gap-4 mb-6">
          {[
            { key: "add", label: "Add", icon: <MdOutlineAddCircleOutline /> },
            { key: "view", label: "View", icon: <MdOutlineViewList /> },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setSubTab(key)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md border ${
                subTab === key
                  ? "bg-[#3b5bdd] text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      );
    }

    if (tab === "users") {
      return (
        <div className="flex justify-center gap-4 mb-6">
          {[
            { key: "add", label: "Add", icon: <MdOutlineAddCircleOutline /> },
            { key: "view", label: "View", icon: <MdOutlineViewList /> },
            { key: "update", label: "Update", icon: <MdEdit /> },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setSubTab(key)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md border ${
                subTab === key
                  ? "bg-[#3b5bdd] text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>
      );
    }

    return null;
  };

  return (
    <section className="min-h-screen bg-[#f8faff] px-4 py-10 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#3b5bdd] mb-8 text-center flex items-center justify-center gap-2">
          🛠️ Admin Dashboard
        </h1>

        <div className="flex justify-center gap-4 flex-wrap mb-8">
          {[
            { key: "videos", label: "Videos", icon: <FaVideo /> },
            { key: "users", label: "Users", icon: <FaUsers /> },
            {
              key: "complaints",
              label: "Complaints",
              icon: <FaRegCommentDots />,
            },
            { key: "suggestions", label: "Suggestions", icon: <FaLightbulb /> },
          ].map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => {
                setTab(key);
                setSubTab("add");
              }}
              className={`flex items-center gap-2 px-5 py-2 rounded-full border ${
                tab === key
                  ? "bg-[#3b5bdd] text-white shadow-md"
                  : "bg-white text-gray-700"
              }`}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {renderSubTabs()}

        <div className="bg-white p-6 rounded-xl shadow-md min-h-[180px] text-center text-gray-800">
          {renderSubContent()}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
