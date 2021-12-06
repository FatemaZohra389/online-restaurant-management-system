import React from "react";
import { Card, Button, CardGroup } from "react-bootstrap";
import Menu1 from "./../../assets/images/1.jpg";
import "./Menu.scss";
const dummyData = [
  {
    id: 1,
    name: "pizza",
    price: 700,
    img: Menu1,
  },
  {
    id: 2,
    name: "burger",
    price: 200,
    img: Menu1,
  },
  {
    id: 3,
    name: "pasta",
    price: 300,
    img: Menu1,
  },
];
function Menu() {
  return (
    <div>
      {/* <h1>hello menu</h1>
      <img src={Menu1} alt="" /> */}
      <CardGroup>
        {dummyData.map((menu) => {
          return (
            <Card style={{ width: "5rem" }}>
              <Card.Img variant="top" src={menu.img} />
              <Card.Body>
                <Card.Title>{menu.name}</Card.Title>
                <Card.Text>Price {menu.price}</Card.Text>
                <Button variant="primary">Add to Cart</Button>
              </Card.Body>
            </Card>
          );
        })}
      </CardGroup>
    </div>
  );
}

export default Menu;
