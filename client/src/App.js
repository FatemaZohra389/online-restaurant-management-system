

import Navbar from "./pages/Navbar/Navbar";
import Section from "./pages/Section/Section";
import { BrowserRouter as Router  } from "react-router-dom";
import "./App.scss";
import Menu from "./pages/Menu/Menu";
import Order from "./pages/Order/Order";
import Signup from "./pages/Signup/Signup";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter,Routes, Route  } from "react-router-dom";

function App() {
  return (

 <Router>
   <div>
     <Navbar />
    
     <Section />
   </div>
 </Router>
  );
}
export default App;