"use client";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const API_URL = process.env.NEXT_PUBLIC_APP_API_URL;

export default function UserList() {
  const [users, setUsers] = useState([]);

  // Fetch all users on mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${API_URL}api/users/view`, {
          credentials: "include", // important for cookie auth
        });
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
        Swal.fire("Error", "Failed to fetch users.", "error");
      }
    };
    fetchUsers();
  }, []);

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this user?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      const res = await fetch(`${API_URL}api/users/delete/${_id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u._id !== _id));
        Swal.fire("Deleted!", "User has been removed.", "success");
      } else {
        Swal.fire("Error", "Failed to delete user.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong.", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">👥 User List</h2>
      {users.length === 0 ? (
        <p className="text-gray-500">No users found.</p>
      ) : (
        <div className="space-y-4">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center bg-white shadow-md p-4 rounded border"
            >
              <div>
                <p className="font-bold">
                  {user.name} ({user.eid})
                </p>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-400">Role: {user.role}</p>
              </div>
              <button
                onClick={() => handleDelete(user._id)}
                className="text-red-500 text-xl hover:text-red-700"
                title="Delete User"
              >
                ❌
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
