"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-300 py-6">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          © 2025{" "}
          <a
            href="https://triostack.in"
            className="underline hover:text-white transition"
          >
            Triostack Technologies Pvt. Ltd
          </a>{" "}
          — All rights reserved.
        </p>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <a
            href="	https://www.linkedin.com/company/triostack-technologies-private-limited/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/Triostacksoftware"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            GitHub
          </a>
          <a
            href="https://www.instagram.com/triostack/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Instagram
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=61577525619914"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
