"use client";
import React, { useEffect, useState } from "react";

interface Complaint {
  _id: string;
  message: string;
  createdAt?: string;
}

const ComplaintCards = () => {
  const [complaints, setComplaints] = useState<Complaint[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}api/complaints/view`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setComplaints(data);
        } else {
          setComplaints([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching complaints:", err);
        setComplaints([]);
      });
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {complaints.length > 0 ? (
        complaints.map((c) => (
          <div
            key={c._id}
            className="relative border p-4 rounded-xl shadow bg-white"
          >
            <p className="text-gray-800 text-base mb-2">{c.message}</p>
            {c.createdAt && (
              <p className="text-xs text-gray-500">
                <strong>Created on:</strong>{" "}
                {new Date(c.createdAt).toLocaleString()}
              </p>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-2">
          No complaints found.
        </p>
      )}
    </div>
  );
};

export default ComplaintCards;
