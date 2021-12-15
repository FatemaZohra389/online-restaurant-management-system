import React from "react";
import "./Signup.scss";
import  { useState } from "react";
import { useNavigate ,Link } from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";


const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");

  console.log(username, password,confirmpassword);
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const onClickLogin = () => {
    alert("Signup");
    navigate("/home");

  };
  console.log(username, password, confirmpassword);


  return (
    <div className="signup-page">
      <div className="container">
        <div className="app-wrapper">
          <div>
            <h2 className="title">Create Account</h2>
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
              </div>
            <div className="confirm-password">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <RiLockPasswordFill />
                </InputGroup.Text>
                <FormControl
                  type="confirm-password"
                  placeholder="confirm-Password"
                  aria-label="confirm-Password"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
          {/* <form onSubmit={onClickLogin} className="from-wrapper">
            <div className="name">
              <label className="label">User name</label>
              <input className="input" type="text" name="username" />
            </div>
            <div className="password">
              <label className="label">Password</label>
              <input className="input" type="text" name="password" />
            </div>
            <div className="confirm-password">
              <label className="label">Confirm-password</label>
              <input className="input" type="text" name="confirm-password" />
            </div>

            <div>
              <button className="submit">Sign up</button>
            </div>
          </form> */}
          </div>
          <div>
              <button className="submit">Submit</button>
            </div>
          </form>
        </div>
        </div>
      </div>
      

  );
};
export default Signup;
