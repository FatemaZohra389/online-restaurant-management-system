import React, { useState } from "react";
import { useNavigate ,Link } from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";
import "./LoginPage.scss";

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
    <div className="login-page">
      <div className="container">
        <div className="app-wrapper">
          <div>
            <h2 className="title">
              <BsPersonCircle />
            </h2>
          </div>
          <form onSubmit={onClickLogin} className="from-wrapper">
            <div className="name">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <AiOutlineUser />
                </InputGroup.Text>
                <FormControl
                  placeholder="Username"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              {/* <label className="label">User name</label>
              <input className="input" type="text" name="username" /> */}
            </div>
            <div className="password">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <RiLockPasswordFill />
                </InputGroup.Text>
                <FormControl
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              {/* <label className="label">Password</label>
              <input className="input" type="text" name="password" /> */}
            </div>
<div>Forget password?

<Link to="/signup">SignUp </Link>

</div>
            <div>
              <button className="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
