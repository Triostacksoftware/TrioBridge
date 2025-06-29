"use client";
import React, { useState, useRef, useEffect } from "react";
import { LogOut, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
const LoginHeader = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}api/auth/logout`,
        {},
        { withCredentials: true }
      );
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };
  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Logo */}
      <div
        className="flex items-center gap-2"
        onClick={() => {
          router.push("/");
        }}
      >
        <Image
          src="/logo3.png" // ✅ Replace with your actual white BG-less logo
          alt="Triobridge Logo"
          width={140}
          height={140}
        />{" "}
      </div>

      {/* Profile */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 transition"
        >
          <User className="text-gray-600" size={20} />
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md border border-gray-200 z-10">
            <button
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default LoginHeader;
