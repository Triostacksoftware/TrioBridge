import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import LoginPage from "./Login";
import SEOComponent from "../components/SEOComponent";
const page = () => {
  return (
    <div>
      <SEOComponent
        title="Login – TrioBridge by Triostack"
        description="Log in to your TrioBridge intern dashboard. Manage onboarding, monitor training, and track performance."
        url="https://triobridge.triostack.in/login"
      />

      <Header />
      <LoginPage />
      <Footer />
    </div>
  );
};

export default page;
