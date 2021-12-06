import React, { Component } from 'react'
import './Section.css';
import Home from './Home';
import Menu from './Menu';
import Contact from './Contact';
import About from './About';
import Order from './Order';
import {  Route ,Routes } from "react-router-dom";

export class Section extends Component {
    render() {
        return (
           <section>
               <Routes>
<Route path="/" pages={Home} exact/>
<Route path="/menu" pages={Menu} exact/>
<Route path="/contact" pages={Contact} exact/>
<Route path="/about" pages={About} exact/>
<Route path="/order" pages={Order} exact />

</Routes>
<Home/>
  </section>
    )}
}

export default Section
