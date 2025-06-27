"use client";
import React from "react";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaInstagram,
  FaFacebook,
  FaMapMarkerAlt,
} from "react-icons/fa";

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-white px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-700 mb-4">
          Contact Our Team
        </h2>
        <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
          Need help with onboarding, platform access, or setup? Drop us a
          message and our team will respond shortly.
        </p>

        <div className="flex flex-col md:flex-row gap-12">
          {/* Left: Contact Info */}
          <div className="md:w-1/2 space-y-6">
            <div className="text-lg text-gray-700 flex items-start gap-3">
              <FaMapMarkerAlt className="text-blue-600 mt-1" />
              <span>
                Triostack Technologies Pvt. Ltd.
                <br />
                H-1/A, Sector 63, Noida, Uttar Pradesh 201301
              </span>
            </div>

            <div className="text-lg text-gray-700 flex items-center gap-3">
              <FaEnvelope className="text-blue-600" />
              <a href="mailto:hello@triostack.in" className="hover:underline">
                hello@triostack.in
              </a>
            </div>

            <div className="flex gap-4 mt-6">
              <a
                href="https://linkedin.com/company/triostack"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-blue-700 text-2xl hover:scale-110 transition" />
              </a>
              <a
                href="https://github.com/Triostacksoftware"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithub className="text-gray-800 text-2xl hover:scale-110 transition" />
              </a>
              <a
                href="https://instagram.com/triostack"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="text-pink-600 text-2xl hover:scale-110 transition" />
              </a>
              <a
                href="https://facebook.com/triostack"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebook className="text-blue-600 text-2xl hover:scale-110 transition" />
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="text-black md:w-1/2 bg-gray-50 p-8 rounded-xl shadow-md">
            <form className="space-y-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Your Message"
                rows={5}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-full hover:scale-105 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
