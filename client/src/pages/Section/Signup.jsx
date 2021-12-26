import React from "react";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { InputGroup, FormControl } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import { MdLocationOn, MdPhone } from "react-icons/md";
import { AiOutlineUser } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
import { RiLockPasswordFill } from "react-icons/ri";
import "./Signup.scss";
import PinkButton from "../../shared/components/Buttons/PinkButton";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const { addToast } = useToasts();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const onChangeConfirmPassword = (e) => {
    setconfirmPassword(e.target.value);
  };
  const onChangeAddress = (e) => {
    setAddress(e.target.value);
  };
  const onChangePhone = (e) => {
    setPhone(e.target.value);
  };
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onClickSignUp = () => {
    if (password !== confirmPassword) {
      addToast(`Passwords don't match`, {
        appearance: "error",
        autoDismiss: true,
      });
    } else if (!username || !name || !phone || !address) {
      addToast(`Empty Fields!`, {
        appearance: "error",
        autoDismiss: true,
      });
    } else {
      setLoading(true);
      axios
        .post("http://localhost:5000/users/register", {
          username,
          password,
          name,
          address,
          phone,
        })
        .then((res) => {
          console.log({ res });
          navigate("/");
        })
        .catch((e) => {
          console.log({ e });
          addToast(e?.response?.data?.error?.errors[0]?.message || e?.message || "Unexpected Error!", {
            appearance: "error",
            autoDismiss: true,
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };
  console.log(username, password, confirmPassword);

  return (
    <div className="signup-page">
      <div className="container">
        <div className="app-wrapper">
          <div>
            <h2 className="title">Create Account</h2>
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
            </div>
            <div className="confirm-password">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <RiLockPasswordFill />
                </InputGroup.Text>
                <FormControl
                  onChange={onChangeConfirmPassword}
                  type="password"
                  placeholder="Repeat Password"
                  aria-label="confirm-Password"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </div>
            <div className="confirm-password">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <BsPersonCircle />
                </InputGroup.Text>
                <FormControl
                  onChange={onChangeName}
                  type="text"
                  placeholder="Enter Full Name"
                  aria-label="name"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </div>
            <div className="confirm-password">
              <InputGroup className="mb-3">
                <InputGroup.Text id="basic-addon1">
                  <MdPhone />
                </InputGroup.Text>
                <FormControl
                  onChange={onChangePhone}
                  type="text"
                  placeholder="Enter Phone Number"
                  aria-label="phone-number"
                  aria-describedby="basic-addon1"
                />
              </InputGroup>
            </div>
            <div className="confirm-password">
              <InputGroup>
                <InputGroup.Text>
                  <MdLocationOn />
                </InputGroup.Text>
                <FormControl
                  onChange={onChangeAddress}
                  as="textarea"
                  placeholder="Enter Delivery Address"
                  aria-label="Enter address"
                />
              </InputGroup>
            </div>
            <div>
              <PinkButton
                loading={loading}
                onClick={onClickSignUp}
                title="Confirm"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
