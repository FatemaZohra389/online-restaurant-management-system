import React from "react";
import { Table, Container, Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addMenuToCart,
  removeMenuFromCart,
  decreaseQtyFromCart,
} from "../../redux/reducers/cartReducer";

import { addToOrder } from "../../redux/reducers/orderReducer";
import { AiFillDelete } from "react-icons/ai";
import "./Cart.scss";

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
      <div className="m-2">
        <h4>Shopping Cart</h4>
      </div>
      <hr />

      <Container fluid>
        <Table striped borderless hover responsive size="sm">
          <thead>
            <tr>
              <th>Serial</th>
              <th>Image</th>
              <th>Name</th>
              <th className="text-center">Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.list.map((menu, index) => {
              return (
                <tr key={menu.id}>
                  <td  className="align-middle">{index + 1}</td>
                  <td>
                    <Image
                      height={50}
                      width={50}
                      src={menu.photo}
                      rounded
                      fluid
                    />
                  </td>
                  <td className="align-middle">{menu.name}</td>
                  <td className="text-center align-middle">
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => dispatch(decreaseQtyFromCart(menu))}
                    >
                      -
                    </Button>
                    <span>&nbsp;&nbsp;<b>{menu.qty}</b>&nbsp;&nbsp;</span>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => dispatch(addMenuToCart(menu))}
                    >
                      +
                    </Button>

                    {/* <button onClick={() => dispatch(reset())}>Reset</button> */}
                    {/* <button onClick={() => dispatch(decrement())}>Decrease</button> */}
                  </td>
                  <td className="align-middle">${menu.price}</td>
                  <td className="align-middle">${menu.price * menu.qty}</td>
                  <td width="5%" className="text-center">
                    <Button
                    variant="danger"
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
                <h5>
                  <b>Total Price</b>
                </h5>
              </td>
              <td>
                <h5>
                  <b>${getTotalPrice()}</b>
                </h5>
              </td>
            </tr>
          </tfoot>
        </Table>
        <div className="footer">
          <button
            onClick={() => dispatch(addToOrder(cart.list))}
            type="button"
            class="btn btn-warning"
          >
            Confirm order
          </button>
        </div>
      </Container>
    </div>
  );
};

export default Cart;
