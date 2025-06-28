"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Footer from "../components/Footer";
import AdminDashboard from "./AdminDashboard";
import LoginHeader from "../login/LoginHeader";

const AdminDashboardPage = () => {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_APP_API_URL}api/auth/isadmin`,
          { withCredentials: true }
        );
        if (res.data?.user?.role === "admin") {
          setIsAdmin(true);
        } else {
          router.replace("/login");
        }
      } catch (err) {
        console.error("Not an admin or not logged in", err);
        router.replace("/login");
      } finally {
        setChecking(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (checking) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        🔐 Verifying admin access...
      </div>
    );
  }

  if (!isAdmin) return null;

  return (
    <div>
      <LoginHeader />
      <AdminDashboard />
      <Footer />
    </div>
  );
};

export default AdminDashboardPage;
