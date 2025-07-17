import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import OpenAccount from "../OpenAccount";
import Footer from "../Footer";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const storedUsername = localStorage.getItem("username");

    if (!isLoggedIn || !storedUsername) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      {/* All homepage sections */}
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
      {/* <Footer /> */}
    </>
  );
}

export default HomePage;
