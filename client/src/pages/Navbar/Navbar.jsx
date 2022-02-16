import React from "react";
import { useNavigate } from "react-router-dom";
import { Nav, Navbar as NavBar, Container, Button } from "react-bootstrap";
import "./Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { userLogOut } from "../../redux/reducers/userReducer";

const Navbar = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogOut = () => {
    dispatch(userLogOut());
    navigate("/");
  };
  return (
    <>
      <NavBar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container fluid>
          <Nav navbarScroll className="w-100 d-flex justify-content-center">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/menu">Menu</Nav.Link>
            {user?.data?.type === "admin" && (
              <Nav.Link href="/category">Category</Nav.Link>
            )}
            {user?.data?.type !== "admin" && (
              <Nav.Link href="/cart">Cart</Nav.Link>
            )}
            <Nav.Link href="/order">Order</Nav.Link>
          </Nav>
          <NavBar className="justify-content-end">
            <NavBar.Text>
              {user?.data?.name}{" "}
              <Button onClick={onLogOut} type="button" variant="link" size="sm">
                Sign Out
              </Button>
            </NavBar.Text>
          </NavBar>
        </Container>
      </NavBar>
      {/* <div>
        <header>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
           
            
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/order">Order</Link>
            </li>
          </ul>
        </header>
      </div> */}
    </>
  );
};

export default Navbar;
