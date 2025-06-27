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
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import VideoCards from "./VideoCard";
import ComplaintCards from "./ComplaintsCard";
import SuggestionCards from "./SuggestionsCard";
import UserForm from "./UserForm"; // ⬅️ Add this import
import UserList from "./UserList";
const MySwal = withReactContent(Swal);

const AdminDashboard = () => {
  const [tab, setTab] = useState("videos");
  const [subTab, setSubTab] = useState("add");

  const [videoForm, setVideoForm] = useState({
    title: "",
    type: "",
    link: "",
    category: "",
    notes: [],
  });

  const handleVideoSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", videoForm.title);
    formData.append("type", videoForm.type);
    formData.append("link", videoForm.link);
    formData.append("category", videoForm.category);

    Array.from(videoForm.notes).forEach((file) => {
      formData.append("notes", file);
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_API_URL}api/videos/add`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (response.ok) {
        Swal.fire("✅ Success", "Video added successfully!", "success");
        setVideoForm({
          title: "",
          type: "",
          category: "",
          notes: [],
          link: "",
        });
      } else {
        Swal.fire("❌ Error", data?.error || "Something went wrong", "error");
      }
    } catch (error) {
      console.error("Upload error:", error);
      Swal.fire("❌ Error", "Failed to upload", "error");
    }
  };

  const renderSubContent = () => {
    if (tab === "videos") {
      if (subTab === "add") {
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
                className="mt-1 block w-full px-4 py-2 border rounded-md"
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
                className="mt-1 block w-full px-4 py-2 border rounded-md"
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
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Video Link</span>
              <input
                type="url"
                value={videoForm.link}
                onChange={(e) =>
                  setVideoForm({ ...videoForm, link: e.target.value })
                }
                className="mt-1 block w-full px-4 py-2 border rounded-md"
              />
            </label>

            <label className="block">
              <span className="text-gray-700">Notes (Upload Multiple)</span>
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
              className="w-full bg-[#3b5bdd] text-white py-2 rounded-md"
            >
              Submit
            </button>
          </form>
        );
      }
      if (subTab === "view") return <VideoCards confirmDelete />;
    }

    if (tab === "users") {
      if (subTab === "add") return <UserForm mode="add" />;
      if (subTab === "update") return <UserForm mode="edit" />;
      return <UserList />;
    }

    if (tab === "complaints") return <ComplaintCards />;
    if (tab === "suggestions") return <SuggestionCards />;
    return null;
  };

  const renderSubTabs = () => {
    const common = [
      { key: "add", label: "Add", icon: <MdOutlineAddCircleOutline /> },
      { key: "view", label: "View", icon: <MdOutlineViewList /> },
    ];

    const userTabs = [
      ...common,
      { key: "update", label: "Update", icon: <MdEdit /> },
    ];

    const activeTabs = tab === "users" ? userTabs : common;

    return (
      <div className="flex justify-center gap-4 mb-6">
        {activeTabs.map(({ key, label, icon }) => (
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
  };

  return (
    <section className="min-h-screen bg-[#f8faff] px-4 py-10 md:px-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-[#3b5bdd] mb-8 text-center flex items-center justify-center gap-2">
          🛠️ Admin Dashboard
        </h1>

        <div className="flex justify-center gap-4 flex-wrap mb-6">
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
        <div className="bg-white p-6 rounded-xl shadow-md min-h-[200px] text-gray-800">
          {renderSubContent()}
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
