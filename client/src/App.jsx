import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Section from "./pages/Section/Section";
import LoginPage from "./pages/Section/LoginPage";
import Signup from "./pages/Section/Signup";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import "./App.scss";

function App() {
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const socket = socketIOClient('http://127.0.0.1:5001');
    socket.on("FromAPI", (data) => {
      // setResponse(data);
      console.log(data);
    });
    return () => socket.disconnect();
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        {(!(user && user.data) && (
          <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/*" element={<Navigate replace to="/" />} />
          </>
        )) || <Route path="/*" element={<Section />} />}
      </Routes>
    </BrowserRouter>
  );
}
export default App;
