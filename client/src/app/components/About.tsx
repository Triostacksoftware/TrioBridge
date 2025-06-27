"use client";
import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <section
      id="about"
      className="py-12 px-6 bg-gradient-to-b from-white via-blue-50 to-white transition-all duration-300"
    >
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
        <div className="md:w-1/2 flex justify-center">
          <div className="relative group rounded-2xl ring-4 ring-purple-100 hover:scale-105 transition-transform duration-300 shadow-xl">
            <Image
              src="/about1.png"
              alt="TrioBridge About Illustration"
              width={500}
              height={400}
              className="rounded-2xl"
            />
          </div>
        </div>
        {/* Left Content */}
        <div className="md:w-1/2 text-center md:text-left">
          <div className="inline-block bg-purple-100 text-purple-700 font-medium px-4 py-1 rounded-full text-sm mb-4">
            Intern HR Platform
          </div>
          <h2 className="text-4xl font-extrabold mb-6 leading-snug">
            <span className="text-blue-700">What is </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 animate-pulse">
              TrioBridge?
            </span>
          </h2>
          <p className="text-gray-700 text-[1.05rem] leading-8 mb-6">
            <strong>TrioBridge</strong> by Triostack is a powerful internal HR
            platform built to modernize intern management and enhance
            operational efficiency for HR teams.
          </p>
          <p className="text-gray-600 text-[1.05rem] leading-8 mb-6">
            <strong>TrioBridge</strong> by Triostack is a powerful internal HR
            platform built to modernize intern management and enhance
            operational efficiency for HR teams.
          </p>

          <ul className="space-y-4 text-gray-700 text-[1.05rem] leading-8">
            <li>
              <span className="font-semibold text-indigo-600">
                1. Onboarding:
              </span>{" "}
              Seamlessly onboard interns with structured steps, document
              collection, and welcome guides.
            </li>
            <li>
              <span className="font-semibold text-blue-700">
                2. Project Tracking:
              </span>{" "}
              Assign real-time tasks, monitor deadlines, and track intern
              productivity.
            </li>
            <li>
              <span className="font-semibold text-emerald-600">
                3. Training Modules:
              </span>{" "}
              Offer access to skill-based training content, notes, and reviews.
            </li>
          </ul>
        </div>

        {/* Right Image */}
      </div>
    </section>
  );
};

export default About;
