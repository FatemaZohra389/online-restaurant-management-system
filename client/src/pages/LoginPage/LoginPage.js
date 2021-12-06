import React, { useState } from "react";
import { Card, Button, Row, Col, Form, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  console.log(username, password);
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onClickLogin = () => {
    alert("Login");
    navigate("/home");
  };
  console.log(username, password);
  return (
    <div className="container login-page">
      <div className="app-wrapper">
        <div>
          <h2 className="title">Log In</h2>
        </div>
        <form onSubmit={onClickLogin} className="from-wrapper">
          <div className="name">
            <label className="label">User name</label>
            <input className="input" type="text" name="username" />
          </div>
          <div className="password">
            <label className="label">Password</label>
            <input className="input" type="text" name="password" />
          </div>

          <div>
            <button className="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
