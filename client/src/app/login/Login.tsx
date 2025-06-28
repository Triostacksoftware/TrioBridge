/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { FaLinkedin, FaXTwitter, FaInstagram } from "react-icons/fa6";

const Login = () => {
  const [eid, setEid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_APP_API_URL}api/auth/login`,
        { eid, password },
        { withCredentials: true }
      );

      const { role, name } = response.data;

      toast.success(`Welcome ${name}!`);

      setTimeout(() => {
        if (role === "admin") router.push("/admin-dashboard");
        else {
          router.push("/dashboard");
        }
      }, 1000);
    } catch (error: any) {
      const msg =
        error?.response?.data?.message || "Something went wrong. Try again.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      <Toaster position="top-right" />
      {/* Left panel */}
      <div className="w-1/2 pb-5 hidden lg:flex flex-col justify-between bg-gradient-to-tr from-[#3a0ca3] via-[#7209b7] to-[#4361ee] text-white p-2 rounded-r-none ">
        <div className="flex flex-col items-center mt-3">
          <Image src={"/tb.png"} height={90} width={90} alt="tb" />
          <h2 className="text-5xl font-bold mt-4 leading-tight text-center max-w-3xl">
            Welcome to <span className="text-white">Trio-Bridge</span>
          </h2>
          <p className="text-base mt-2 text-center opacity-90 max-w-xl leading-8">
            Empower your teams to seamlessly manage interns, streamline
            onboarding, monitor training progress, and track performance
            insight.
          </p>
          <Image
            src="/about1.png"
            alt="TrioBridge About Illustration"
            width={320}
            height={320}
            className="rounded-2xl mt-8"
          />
        </div>

        <div className="text-sm mt-8 space-y-2 pl-3">
          <p className="flex items-center gap-2">
            📍 PLOT NO 20, H-1/A, Sector 63, Noida, UP – 201301
          </p>
          <p className="flex items-center gap-2">✉️ info@triostack.in</p>
          <p className="flex items-center gap-2">🌐 www.triostack.in</p>
          <div className="flex gap-4 mt-3 text-white text-xl">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80"
            >
              <FaXTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white/80"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      {/* Right panel - Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center bg-[#f8f9fc] px-6 py-12">
        <div className="max-w-md w-full bg-white rounded-2xl p-10 shadow-xl">
          <div className="text-center mb-6">
            <Image
              src="/logo3.png"
              alt="TrioBridge Logo"
              width={90}
              height={90}
              className="mx-auto mb-2"
            />
            <h2 className="text-2xl font-bold text-gray-800">
              Welcome to <span className="text-[#3b5bdb]">TrioBridge</span>
            </h2>
            <p className="text-sm text-gray-500">
              Log in to your intern dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-black">
                Employee Id
              </label>
              <input
                type="text"
                value={eid}
                onChange={(e) => setEid(e.target.value)}
                required
                className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#5f0fff] focus:border-[#5f0fff]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-black">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full text-black px-4 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-[#5f0fff] focus:border-[#5f0fff]"
              />
            </div>
            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center space-x-2 text-gray-600">
                <input
                  type="checkbox"
                  className="form-checkbox accent-[#3a0ca3]"
                />
                <span>Remember me</span>
              </label>
              <Link href="#" className="text-[#5f0fff] hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#7209b7] to-[#4361ee] text-white py-2 rounded-md font-medium shadow-md hover:opacity-90 transition"
            >
              {loading ? "Logging in..." : "Login →"}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-[#f72585] font-semibold hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
