"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
const Header = () => {
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-white shadow-lg sticky top-0 z-50">
      <Link href={"/"}>
        <Image
          src="/logo3.png" // your logo
          alt="TrioBridge Logo"
          width={150}
          height={150}
          className="object-contain bg-white"
        />
      </Link>
      <nav className="flex gap-6 text-sm font-medium items-center ">
        <Link
          href="/login"
          className="bg-gradient-to-r p-4 from-purple-600 to-blue-600 text-white px-5 py-2 rounded-full hover:opacity-90 transition"
        >
          Login →
        </Link>
      </nav>
    </header>
  );
};

export default Header;
