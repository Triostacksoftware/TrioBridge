"use client";
import React from "react";
import { FaVideo, FaFileAlt, FaTasks, FaComments } from "react-icons/fa";

const services = [
  {
    title: "Training Videos",
    desc: "Structured lectures with progress tracking.",
    icon: <FaVideo className="text-indigo-600 text-3xl" />,
  },
  {
    title: "Document Manager",
    desc: "Auto-generate offer letters, certificates, NOCs.",
    icon: <FaFileAlt className="text-blue-600 text-3xl" />,
  },
  {
    title: "Project Tracker",
    desc: "Kanban-style task dashboard and mentor feedback.",
    icon: <FaTasks className="text-emerald-600 text-3xl" />,
  },
  {
    title: "Feedback Engine",
    desc: "Anonymous suggestion & complaint box with reviews.",
    icon: <FaComments className="text-purple-600 text-3xl" />,
  },
];

const Services = () => {
  return (
    <section id="services" className="py-20 bg-blue-50 px-6 text-center">
      <h2 className="text-4xl font-bold text-blue-700 mb-12">
        Platform Highlights
      </h2>
      <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
        {services.map((s, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 text-left group"
          >
            <div className="flex items-center gap-4 mb-3">
              <div className="bg-blue-100 p-3 rounded-full group-hover:scale-105 transition">
                {s.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800">{s.title}</h3>
            </div>
            <p className="text-gray-600 pl-[3.4rem]">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
