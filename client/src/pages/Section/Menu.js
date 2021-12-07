import React from "react";
import { Card, Button, CardGroup ,Row,Col} from "react-bootstrap";

import img1 from "./../../assets/images/img1.jpg";
import img2 from "./../../assets/images/img2.jpg";
import img3 from "./../../assets/images/img3.jpg";
import img5 from "./../../assets/images/img5.png";
import img6 from "./../../assets/images/img6.jpg";
import img7 from "./../../assets/images/img7.jpg";

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
    id: 3,
    name: "Pizza",
    price: 300,
    img: img6,
  },
  {
    id: 3,
    name: "Salad ",
    price: 300,
    img: img7,
  },
];
function Menu() {
  return (
    <div>
      <Row xs={1} md={2} className="g-4">
  {Array.from({ length: 4 }).map((_, idx) => (
    <Col>
      <Card>
        <Card.Img variant="top" src="img1" />
        <Card.Body>
          <Card.Title>Card title</Card.Title>
          <Card.Text>
            This is a longer card with supporting text below as a natural
            lead-in to additional content. This content is a little bit longer.
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  ))}
</Row>
      </div>
    
  )
      }

export default Menu;
