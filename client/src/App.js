

import "./App.scss";
import Menu from "./pages/Menu/Menu";
import Order from "./pages/Order/Order";
import Signup from "./pages/Signup/Signup";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";
import { BrowserRouter,Routes, Route  } from "react-router-dom";
function App() {
  return (
    <>

<BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="signup" element={<Signup />} />
      <Route path="home" element={<HomePage />} />
      <Route path="menu" element={<Menu />} />
      <Route path="order" element={<Order />} />
    </Routes>
  </BrowserRouter>
  </>
  );
}
export default App;