import "./App.css";
import Navbar from "./pages/Navbar/Navbar";
import Section from "./pages/Section/Section";

import { BrowserRouter as Router  } from "react-router-dom";
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