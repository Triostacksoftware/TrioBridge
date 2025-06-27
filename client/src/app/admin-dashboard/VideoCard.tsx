"use client";

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

interface Video {
  _id: string;
  title: string;
  type: string;
  category: string;
  notes?: string[];
  link?: string;
  linkName?: string;
}

const mockVideos: Video[] = [
  {
    _id: "mock1",
    title: "React Basics",
    type: "Frontend",
    category: "Web Development",
    notes: ["react-notes.pdf"],
    link: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
    linkName: "React Tutorial",
  },
  {
    _id: "mock2",
    title: "Node.js API Design",
    type: "Backend",
    category: "API",
    notes: ["node-guide.pdf"],
    link: "https://www.youtube.com/watch?v=Oe421EPjeBE",
    linkName: "Node.js Guide",
  },
];

const VideoCards = () => {
  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetch(`${API_URL}api/videos/view`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setVideos(data);
        } else {
          setVideos(mockVideos);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch, using mock data:", err);
        setVideos(mockVideos);
      });
  }, []);

  const handleDeleteVideo = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This video will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    const isMock = id.startsWith("mock");
    if (isMock) {
      setVideos((prev) => prev.filter((v) => v._id !== id));
      return Swal.fire(
        "Deleted!",
        "The mock video has been removed.",
        "success"
      );
    }

    try {
      const res = await fetch(`${API_URL}api/videos/delete/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setVideos((prev) => prev.filter((v) => v._id !== id));
        Swal.fire("Deleted!", "The video has been removed.", "success");
      } else {
        Swal.fire("Error", "Failed to delete the video.", "error");
      }
    } catch (err) {
      console.error("Delete error:", err);
      Swal.fire("Error", "Something went wrong. Try again.", "error");
    }
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {videos.map((video) => (
        <div
          key={video._id}
          className="border rounded-xl p-4 shadow-md bg-white relative"
        >
          <button
            className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-xl"
            onClick={() => handleDeleteVideo(video._id)}
          >
            ❌
          </button>

          <h3 className="text-lg font-semibold text-blue-600 mb-1">
            {video.title}
          </h3>
          <p className="text-sm text-gray-500 mb-1">
            <strong>Type:</strong> {video.type}
          </p>
          <p className="text-sm text-gray-500 mb-2">
            <strong>Category:</strong> {video.category}
          </p>

          {video.link && (
            <a
              href={video.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-sm text-blue-500 underline hover:text-blue-700 mb-2"
            >
              ▶ {video.linkName || "Watch Video"}
            </a>
          )}

          {video.notes && video.notes.length > 0 && (
            <div className="text-sm text-green-600">
              <strong>Notes:</strong>
              <ul className="list-disc list-inside">
                {video.notes.map((note, idx) => (
                  <li key={idx}>
                    <a
                      href={
                        note.startsWith("http")
                          ? note
                          : `${API_URL}uploads/${note}`
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
      ))}
    </div>
  );
};

export default VideoCards;
