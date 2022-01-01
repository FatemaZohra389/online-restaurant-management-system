import React from "react";
import "./Section.css";
import Home from "./Home";
import Menu from "./Menu";
import Contact from "./Contact";
import About from "./About";
import Cart from "./Cart";
import Order from "./Order";
import Navbar from "../Navbar/Navbar";
import { Route, Routes, Navigate } from "react-router-dom";

const Section = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <>
          <Route path="home" element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
          <Route path="*" element={<Navigate to="home" />} />
        </>
      </Routes>
    </>
  );
};

export default Section;
