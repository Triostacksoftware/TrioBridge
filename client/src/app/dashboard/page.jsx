"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FileText,
  Video,
  Folder,
  MessageCircle,
  Target,
  Lightbulb,
} from "lucide-react";
import FeedbackForm from "./FeedbackForm";
import { useRouter } from "next/navigation";
import LoginHeader from "../login/LoginHeader";
import Footer from "../components/Footer";

export default function DashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Documents");
  const [videoSubTab, setVideoSubTab] = useState("Tech");
  const [videos, setVideos] = useState([]);
  const [authChecked, setAuthChecked] = useState(false);
  const [user, setUser] = useState(null);

  const tabs = [
    { label: "Documents", icon: <FileText size={18} /> },
    { label: "Videos", icon: <Video size={18} /> },
    { label: "Projects", icon: <Folder size={18} /> },
    { label: "Complaints", icon: <MessageCircle size={18} /> },
    { label: "Suggestions", icon: <Lightbulb size={18} /> },
    { label: "Review", icon: <MessageCircle size={18} /> },
    { label: "Payments", icon: <Folder size={18} /> },
  ];

  useEffect(() => {
    const checkUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}api/auth/isuser`,
          { withCredentials: true }
        );
        if (!res.data?.user) {
          router.replace("/login");
        } else {
          setAuthChecked(true);
        }
      } catch {
        router.replace("/login");
      }
    };
    checkUser();
  }, [router]);

  useEffect(() => {
    if (!authChecked) return;

    const fetchData = async () => {
      try {
        const userInfo = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}api/auth/isuser`,
          { withCredentials: true }
        );

        const allUsers = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}api/users/view`
        );

        const found = allUsers.data.find(
          (u) => u.eid === userInfo.data.user.eid
        );
        setUser(found || null);
      } catch (err) {
        console.error("User fetch failed", err);
      }
    };

    const fetchVideos = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}api/videos/view`
        );
        setVideos(res.data || []);
      } catch (err) {
        console.error("Video fetch failed", err);
      }
    };

    fetchData();
    fetchVideos();
  }, [authChecked]);

  if (!authChecked || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        ⏳ Verifying user and loading data...
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "Documents":
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-indigo-600 mb-4 flex items-center gap-2">
              <FileText size={22} /> Your Uploaded Documents
            </h2>
            {user.documents?.length > 0 ? (
              <ul className="grid md:grid-cols-2 gap-3">
                {user.documents.map((doc, idx) => (
                  <li
                    key={idx}
                    className="flex items-center justify-between p-3 bg-gray-50 border rounded-lg hover:shadow transition"
                  >
                    <span className="text-gray-700 font-medium">
                      📄 Document {idx + 1}
                    </span>
                    <a
                      href={`${process.env.NEXT_PUBLIC_APP_API_URL}uploads/${doc}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-600 underline hover:text-blue-800"
                    >
                      View
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No documents uploaded.</p>
            )}
          </div>
        );

      case "Projects":
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-green-600 mb-4 flex items-center gap-2">
              <Folder size={22} /> Assigned Projects
            </h2>
            {user.projects?.length > 0 ? (
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                {user.projects.map((p, i) => (
                  <li key={i}>✅ {p}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No projects assigned.</p>
            )}
          </div>
        );

      case "Review":
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <h2 className="text-xl font-bold text-purple-600 mb-4 flex items-center gap-2">
              <MessageCircle size={22} /> Your Review Summary
            </h2>
            {user.review ? (
              <div className="text-gray-700 border-l-4 pl-4 border-purple-300">
                {user.review}
              </div>
            ) : (
              <p className="text-gray-500">No review recorded.</p>
            )}
          </div>
        );

      case "Complaints":
        return (
          <FeedbackForm
            type="Complaint"
            icon={<MessageCircle size={24} />}
            color="red"
          />
        );

      case "Suggestions":
        return (
          <FeedbackForm
            type="Suggestion"
            icon={<Lightbulb size={24} />}
            color="yellow"
          />
        );

      case "Videos":
        const filteredVideos = videos.filter(
          (v) =>
            v.category?.toLowerCase() === videoSubTab.toLowerCase() &&
            v.type?.toLowerCase() !== "admin"
        );
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-center gap-4 mb-6">
              {["Tech", "Non-Tech"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setVideoSubTab(cat)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                    videoSubTab === cat
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
                  <div
                    key={video._id}
                    className="border rounded-xl p-4 shadow hover:shadow-md transition"
                  >
                    <h4 className="font-semibold text-black text-lg mb-2">
                      {video.title}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      Category: {video.category || "N/A"}
                    </p>
                    {video.link && (
                      <a
                        href={video.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline text-sm"
                      >
                        ▶ Watch Video
                      </a>
                    )}
                    {video.notes?.length > 0 && (
                      <div className="text-sm text-green-600 mt-2">
                        <strong>Notes:</strong>
                        <ul className="list-disc list-inside">
                          {video.notes.map((note, idx) => (
                            <li key={idx}>
                              <a
                                href={
                                  note.startsWith("http")
                                    ? note
                                    : `${process.env.NEXT_PUBLIC_APP_API_URL}uploads/${note}`
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="underline text-blue-500 hover:text-blue-700"
                              >
                                📥 Download Note {idx + 1}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 col-span-full text-center">
                  No {videoSubTab} videos available.
                </p>
              )}
            </div>
          </div>
        );

      case "Payments":
        return (
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-600">
              💳 Payment history and stipend details will appear here.
              <br />
              <span className="text-blue-600 font-semibold">
                Coming Soon...
              </span>
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <LoginHeader />
      <section className="min-h-screen flex justify-center bg-[#f8faff] px-4 py-10 md:px-12">
        <div className="w-full max-w-6xl">
          <h1 className="text-4xl font-bold text-[#3b5bdd] mb-6 text-center flex items-center justify-center gap-2">
            <Target size={28} /> Welcome to Your Dashboard
          </h1>

          <div className="flex justify-center gap-4 flex-wrap mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`flex items-center gap-2 px-5 py-2 rounded-full font-medium text-sm shadow transition ${
                  activeTab === tab.label
                    ? "bg-[#3b5bdd] text-white"
                    : "bg-white text-gray-700 border border-gray-300 hover:bg-[#eef3ff]"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          {renderTabContent()}
        </div>
      </section>
      <Footer />
    </>
  );
}
