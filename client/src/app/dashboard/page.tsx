"use client";

import React, { useState } from "react";
import {
  FileText,
  Video,
  Folder,
  MessageCircle,
  Target,
  Lightbulb,
} from "lucide-react";
import LoginHeader from "../login/LoginHeader";
import Footer from "../components/Footer";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("Documents");
  const [videoSubTab, setVideoSubTab] = useState("Tech");

  const tabs = [
    { label: "Documents", icon: <FileText size={18} /> },
    { label: "Videos", icon: <Video size={18} /> },
    { label: "Projects", icon: <Folder size={18} /> },
    { label: "Complaints", icon: <MessageCircle size={18} /> },
    { label: "Suggestions", icon: <Lightbulb size={18} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Documents":
        return (
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-600">
              📁 Upload or browse shared documents here.
            </p>
          </div>
        );
      case "Videos":
        return (
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-center gap-4 mb-6">
              <button
                onClick={() => setVideoSubTab("Tech")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  videoSubTab === "Tech"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tech
              </button>
              <button
                onClick={() => setVideoSubTab("Non-Tech")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium ${
                  videoSubTab === "Non-Tech"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Non-Tech
              </button>
            </div>
            <p className="text-center text-gray-600">
              🎥 Showing {videoSubTab} training materials.
            </p>
          </div>
        );
      case "Projects":
        return (
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <p className="text-gray-600">
              📊 Track your assigned projects here.
            </p>
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

          {/* Tab Buttons */}
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

          {/* Dynamic Tab Content */}
          {renderTabContent()}
        </div>
      </section>
      <Footer />
    </>
  );
}

// ✅ Extracted reusable FeedbackForm component
function FeedbackForm({
  type,
  icon,
  color,
}: {
  type: string;
  icon: React.ReactNode;
  color: string;
}) {
  const themeColor =
    color === "red"
      ? "text-red-600 bg-red-100"
      : color === "yellow"
      ? "text-yellow-600 bg-yellow-100"
      : "text-blue-600 bg-blue-100";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 max-w-3xl mx-auto text-gray-700">
      <div className="flex items-start gap-4">
        <div className={`${themeColor} p-3 rounded-full shadow-sm`}>{icon}</div>
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            Submit {type}
          </h3>
          <p className="text-gray-600 text-sm">
            {type === "Complaint"
              ? "Let us know what’s bothering you or how we can improve your experience."
              : "Got an idea or feedback? We’d love to hear your thoughts!"}
          </p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        <textarea
          placeholder={`Describe your ${type.toLowerCase()}...`}
          className="w-full h-28 rounded-md border border-gray-300 px-4 py-3 text-sm focus:ring-2 focus:ring-[#3b5bdd] focus:outline-none"
        />

        <button className="bg-[#3b5bdd] text-white font-medium px-6 py-2 rounded-lg shadow hover:opacity-90 transition">
          Submit
        </button>
      </div>
    </div>
  );
}
