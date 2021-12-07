import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";



export class Navbar extends Component {
  render() {
    return (
      <div>
        <div>
          <header>
            <ul>
              <li>
                <Link to="/home">Home</Link>
              </li>
              <li>
                <Link to="/menu">Menu</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
              <li>
                <Link to="/cart">Cart</Link>
              </li>
              <li>
                <Link to="/order">Order</Link>
              </li>
            </ul>
          </header>
        </div>
      </div>
    );
  }
}

export default Navbar;
