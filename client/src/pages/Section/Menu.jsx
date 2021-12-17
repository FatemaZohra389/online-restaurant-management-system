import React from "react";
import { Card, Button, CardGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";

import img1 from "./../../assets/images/img1.jpg";
import img2 from "./../../assets/images/img2.jpg";
import img3 from "./../../assets/images/img3.jpg";
import img5 from "./../../assets/images/img5.png";

import "./Menu.scss";
import { addMenuToCart } from "../../redux/reducers/cartReducer";

const dummyData = [
  {
    id: 1,
    name: "Chicken Stake",
    price: 500,
    img: img1,
  },
  {
    id: 2,
    name: "Italian Pasta",
    price: 200,
    img: img2,
  },
  {
    id: 3,
    name: "Chicken Salad",
    price: 300,
    img: img3,
  },
  {
    id: 4,
    name: "Noodles",
    price: 300,
    img: img5,
  },
  {
    id: 5,
    name: "Chicken Stake",
    price: 500,
    img: img1,
  },
  {
    id: 6,
    name: "Italian Pasta",
    price: 200,
    img: img2,
  },
  {
    id: 7,
    name: "Chicken Salad",
    price: 300,
    img: img3,
  },
  {
    id: 8,
    name: "Noodles",
    price: 300,
    img: img5,
  },
];
function Menu() {
  const { addToast } = useToasts();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // console.log({ cart });
  const navigate = useNavigate();
  const onClickCart = (menu) => {
    // console.log("cliecked", menu)
    dispatch(addMenuToCart(menu));
    addToast(`1 ${menu.name} added to Cart`, {
      appearance: "success",
      autoDismiss: true,
    });
    //navigate("/cart");
  };
  return (
    <div className="menu-page p-3">
      <Row xs={1} md={12} className="g-4">
        {dummyData.map((menu, idx) => (
          <Col key={menu.id} md={3}>
            <Card>
              <Card.Img variant="top" src={menu.img} />
              <Card.Body>
                <Card.Title>{menu.name}</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Subtitle>$ {menu.price}</Card.Subtitle>

                  <Button onClick={() => onClickCart(menu)} variant="warning">
                    <AiOutlineShoppingCart />
                    &nbsp;Add
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Menu;
