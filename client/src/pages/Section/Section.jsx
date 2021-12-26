import React, { Component } from "react";
import "./Section.css";
import Home from "./Home";
import Menu from "./Menu";
import Contact from "./Contact";
import About from "./About";
import Cart from "./Cart";
import Order from "./Order";
import Navbar from "../Navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./LoginPage";

export class Section extends Component {
  render() {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="cart" element={<Cart />} />
          <Route path="order" element={<Order />} />
        </Routes>
      </>
    );
  }
}

export default Section;
