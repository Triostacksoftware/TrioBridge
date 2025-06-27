import React from "react";
import Footer from "../components/Footer";
import AdminDashboard from "./AdminDashboard";
import LoginHeader from "../login/LoginHeader";

const page = () => {
  return (
    <div>
      <LoginHeader />
      <AdminDashboard />
      <Footer />
    </div>
  );
};

export default page;
