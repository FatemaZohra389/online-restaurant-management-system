import { BrowserRouter, Routes, Route } from "react-router-dom";
import Section from "./pages/Section/Section";
import LoginPage from "./pages/Section/LoginPage";
import Signup from "./pages/Section/Signup";
import "./App.scss";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/*" element={<Section />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
