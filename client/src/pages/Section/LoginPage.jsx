import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { useDispatch } from "react-redux";
import axios from "axios";
import { RiLockPasswordFill } from "react-icons/ri";
import "./LoginPage.scss";
import PinkButton from "../../shared/components/Buttons/PinkButton";
import { useToasts } from "react-toast-notifications";
import { userLoginSuccessful } from "../../redux/reducers/userReducer";

const LoginPage = () => {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(null);
  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onClickLogin = () => {
    setLoading(true);
    axios
      .post("http://localhost:5000/users/login", {
        username,
        password,
      })
      .then((res) => {
        console.log({ res });
        dispatch(userLoginSuccessful(res.data.user));
        navigate("/home");
        addToast(
          "Successfully logged in! :)",
          {
            appearance: "success",
            autoDismiss: true,
          }
        );
      })
      .catch((e) => {
        console.log({ e });
        addToast(
          e?.response?.data?.error?.errors[0]?.message ||
            e?.response?.data?.message ||
            e?.message ||
            "Unexpected Error!",
          {
            appearance: "error",
            autoDismiss: true,
          }
        );
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="login-page">
      <div className="container mt-0">
        <div className="app-wrapper">
          <div>
            <h2 className="title">
              <BsPersonCircle />
            </h2>
          </div>
          <form className="from-wrapper">
            <div className="name">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <AiOutlineUser />
                </InputGroup.Text>
                <FormControl
                  onChange={onChangeUsername}
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
                  onChange={onChangePassword}
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
              {/* <label className="label">Password</label>
              <input className="input" type="text" name="password" /> */}
            </div>
            <div className="d-flex justify-content-end w-100">
              {/* Forget password? */}
              <Link to="/signup">Create an account</Link>
            </div>
            <div>
              <PinkButton
                loading={loading}
                onClick={onClickLogin}
                title="Login"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
