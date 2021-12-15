import React, { Component } from "react";
import { Table, Container , button } from "react-bootstrap";
import "./Cart.scss";

import img1 from "./../../assets/images/img1.jpg";
import img2 from "./../../assets/images/img2.jpg";
import img3 from "./../../assets/images/img3.jpg";
import img5 from "./../../assets/images/img5.png";
import img6 from "./../../assets/images/img6.jpg";
import img7 from "./../../assets/images/img7.jpg";

const dummyData = [
  {
    id: 1,
    name: "Chicken Stake",
    price: 500,
    qty: 1,
    img: img1,
  },
  {
    id: 2,
    name: "Italian Pasta",
    price: 200,
    qty: 1,
    img: img2,
  },
  {
    id: 3,
    name: "Chicken Salad",
    price: 300,
    qty: 1,
    img: img3,
  },
  {
    id: 3,
    name: "Noodles",
    price: 300,
    qty: 1,
    img: img5,
  },
  {
    id: 3,
    name: "Pizza",
    price: 300,
    qty: 1,
    img: img6,
  },
  {
    id: 3,
    name: "Salad ",
    price: 300,
    qty: 2,
    img: img7,
  },
];
export class Cart extends Component {
  render() {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>

        <Container>
          <Table>
            <thead>
              <tr>
                <th>Serial</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((menu, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{menu.name}</td>
                    <td>{menu.qty}</td>
                    <td>{menu.price}</td>
                    <td>{menu.price * menu.qty}</td>
                  </tr>
                  
                );
              })}
            </tbody>
          </Table>
          <button type="button" class="btn btn-warning">Confirm order</button>
        </Container>
      </div>
    );
  }
}

export default Cart;
