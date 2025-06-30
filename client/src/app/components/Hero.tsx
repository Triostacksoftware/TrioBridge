"use client";
import React from "react";
import Image from "next/image";
import { FaUsersCog, FaGraduationCap, FaRocket } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  return (
    <section className="bg-gradient-to-br from-[#f5f0ff] to-[#e3f0ff] min-h-[90vh] flex items-center">
      <div className="max-w-6xl mx-auto px-3 grid md:grid-cols-2 gap-y-12 items-center">
        {/* Left Content */}
        <div className="space-y-6">
          {/* Logo card */}
          <div className="w-fit bg-white px-4 py-2 rounded-xl shadow-md mb-2">
            <Image
              src="/sign.png" // your logo
              alt="TrioBridge Logo"
              width={70}
              height={70}
              className="object-contain bg-white -ml-1"
            />
          </div>

          {/* Headline */}
          <h1 className="text-4xl mt-3 md:text-[6.9vmin] font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-blue-700 leading-normal lg:leading-[8vmin]">
            Empower People Excellence <br /> with{" "}
            <span className="text-blue-700">TrioBridge</span>
          </h1>

          {/* Subtext */}
          <p className="text-gray-700 text-md lg:text-md leading-relaxed pr-2">
            The all-in-one internal HR, training & performance management
            platform designed for modern teams by <strong>Triostack</strong>.
          </p>

          {/* CTA */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={() => router.push("/login")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-full shadow hover:scale-105 transition font-medium"
            >
              Get Started
            </button>
            <button
              className="border border-blue-600 text-blue-700 px-6 py-3 rounded-full hover:bg-blue-50 transition font-medium"
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=eVdOw2K-_b0",
                  "_blank"
                )
              }
            >
              Watch Demo
            </button>
          </div>

          {/* Features */}

          <div className="hidden lg:block">
            <div className=" flex space-x-8 lg:space-x-20  mt-16 lg:mt-10 text-sm text-gray-600">
              <div className="flex flex-col items-center ml-2">
                <FaUsersCog className="text-blue-600 text-2xl mb-1 text-center" />
                On-Boarding
              </div>
              <div className="flex  flex-col items-center">
                <FaGraduationCap className="text-purple-600 text-2xl mb-1 text-center" />
                Skill Training
              </div>
              <div className="flex flex-col items-center">
                <FaRocket className="text-pink-500 text-2xl mb-1 text-center" />
                Performance Boost
              </div>
            </div>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="hidden md:flex justify-center ml-5">
          <Image
            src="/about.png" // or any SVG/illustration
            alt="Hero Illustration"
            width={500}
            height={400}
            className="rounded-2xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
