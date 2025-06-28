import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import SEOComponent from "./components/SEOComponent";
const page = () => {
  return (
    <>
      <SEOComponent
        title="TrioBridge – Intern & HR Management Tool by Triostack"
        description="Empower People Excellence with TrioBridge – a platform for intern onboarding, training, and performance tracking built by Triostack."
        url="https://triobridge.triostack.in"
      />

      <Header />

      <Hero />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  );
};

export default page;
