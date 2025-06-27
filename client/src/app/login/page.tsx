import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginPage from "./Login";

const page = () => {
  return (
    <div>
      <Header />
      <LoginPage />
      <Footer />
    </div>
  );
};

export default page;
