import { useState } from "react";

// Tailwind-safe color map
const colorMap = {
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-600",
    hover: "hover:bg-blue-700",
  },
  purple: {
    text: "text-purple-600",
    bg: "bg-purple-600",
    hover: "hover:bg-purple-700",
  },
  green: {
    text: "text-green-600",
    bg: "bg-green-600",
    hover: "hover:bg-green-700",
  },
  red: {
    text: "text-red-600",
    bg: "bg-red-600",
    hover: "hover:bg-red-700",
  },
};

const FeedbackForm = ({ type, icon, color }) => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const styles = colorMap[color] || colorMap.blue;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!message.trim()) {
      setStatus("Please enter a message.");
      return;
    }

    try {
      const endpoint =
        type === "Complaint"
          ? `${process.env.NEXT_PUBLIC_APP_API_URL}api/complaints/add`
          : `${process.env.NEXT_PUBLIC_APP_API_URL}api/suggestions/add`;

      const res = await axios.post(
        endpoint,
        { message },
        { withCredentials: true }
      );

      setStatus("Submitted successfully!");
      setMessage("");
    } catch (error) {
      console.error("Submission error:", error);
      setStatus("Failed to submit. Try again.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto w-full">
      <h2
        className={`text-xl font-semibold ${styles.text} mb-4 flex items-center gap-2`}
      >
        {icon} Submit a {type}
      </h2>

      <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
        <textarea
          className="w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="5"
          placeholder={`Enter your ${type.toLowerCase()} here...`}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
          type="submit"
          className={`px-4 py-2 rounded-lg text-white ${styles.bg} ${styles.hover} transition`}
        >
          Submit {type}
        </button>

        {status && (
          <p
            className={`text-sm ${
              status.includes("success") ? "text-green-600" : "text-red-500"
            }`}
          >
            {status}
          </p>
        )}
      </form>
    </div>
  );
};

export default FeedbackForm;
