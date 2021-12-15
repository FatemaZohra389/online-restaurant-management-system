import React from "react";
import { Table, Container, Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { removeMenuFromCart } from "../../redux/reducers/cartReducer";
import { AiFillDelete } from "react-icons/ai";
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

// const cart = useSelector((state) => state.cart);
// console.log({
//   cart,
// })
export const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  console.log({
    cart,
  });
  const getTotalPrice = () => {
    let total = 0;
    cart.list.forEach((element) => {
      total += element.price * element.qty;
    });
    return total;
  };
  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <Container>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Serial</th>
              <th></th>
              <th>Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.list.map((menu, index) => {
              return (
                <tr key={menu.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      height={50}
                      width={50}
                      src={menu.img}
                      rounded
                      fluid
                    />
                  </td>
                  <td>{menu.name}</td>
                  <td>{menu.qty}</td>
                  <td>$ {menu.price}</td>
                  <td>$ {menu.price * menu.qty}</td>
                  <td>
                    <Button
                      onClick={() => {
                        dispatch(removeMenuFromCart(menu));
                      }}
                    >
                      <AiFillDelete />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={5}>
                <b>Total Price</b>
              </td>
              <td>
                <b>$ {getTotalPrice()}</b>
              </td>
            </tr>
          </tfoot>
        </Table>
        <div className="footer">
          <button type="button" class="btn btn-warning">
            Confirm order
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
