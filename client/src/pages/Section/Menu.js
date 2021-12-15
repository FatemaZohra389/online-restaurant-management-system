import React from "react";
import { Card, Button, CardGroup, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import img1 from "./../../assets/images/img1.jpg";
import img2 from "./../../assets/images/img2.jpg";
import img3 from "./../../assets/images/img3.jpg";
import img5 from "./../../assets/images/img5.png";


import "./Menu.scss";



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
    id: 3,
    name: "Noodles",
    price: 300,
    img: img5,
  },
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
    id: 3,
    name: "Noodles",
    price: 300,
    img: img5,
  },
];
function Menu() {
  const navigate = useNavigate();
  const onClickCart = () => {
    console.log('cliecked');
    //navigate("/cart");
  };
  return (
    <div className="menu-page">
      <Row xs={1} md={12} className="g-4">
        {dummyData.map((menu, idx) => (
          <Col md={3}>
            <Card>
              <Card.Img variant="top" src={menu.img} />
              <Card.Body>
                <Card.Title>{menu.name}</Card.Title>
                <Card.Title>{menu.price}</Card.Title>
                </Card.Body>
              <Card.Footer>
                <Button onClick={onClickCart} variant="warning">
                  Add to  Cart
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Menu;
