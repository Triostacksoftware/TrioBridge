"use client";
import React, { useEffect, useState } from "react";

interface Suggestion {
  _id: string;
  message: string;
  createdAt?: string;
}

const SuggestionCards = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_APP_API_URL}api/suggestions/view`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSuggestions(data);
        } else {
          setSuggestions([]);
        }
      })
      .catch((err) => {
        console.error("Error fetching suggestions:", err);
        setSuggestions([]);
      });
  }, []);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {suggestions.length > 0 ? (
        suggestions.map((s) => (
          <div
            key={s._id}
            className="border p-4 rounded-xl shadow bg-white relative"
          >
            <p className="text-gray-800 text-base mb-2">{s.message}</p>
            {s.createdAt && (
              <p className="text-xs text-gray-500">
                <strong>Created on:</strong>{" "}
                {new Date(s.createdAt).toLocaleString()}
              </p>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 col-span-2">
          No suggestions available.
        </p>
      )}
    </div>
  );
};

export default SuggestionCards;
