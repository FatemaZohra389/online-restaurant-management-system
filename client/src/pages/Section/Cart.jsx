import React from "react";
import { Table, Container, Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addMenuToCart,
  removeMenuFromCart,
  decreaseQtyFromCart,
} from "../../redux/reducers/cartReducer";
// import { addToOrder } from "../../redux/reducers/orderReducer";
import { AiFillDelete } from "react-icons/ai";
import "./Cart.scss";
import ConfirmOrderModal from "../../shared/components/Modal/ConfirmOrderModal";

export const Cart = () => {
  const [show, setShow] = React.useState(false);
  const cart = useSelector((state) => state.cart);
  const order = useSelector((state) => state.order);
  const dispatch = useDispatch();

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
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cart.list.map((menu, index) => {
              return (
                <tr key={menu.id}>
                  <td className="align-middle">{index + 1}</td>
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
                  <td className="align-middle">
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => dispatch(decreaseQtyFromCart(menu))}
                    >
                      -
                    </Button>
                    <span>
                      &nbsp;&nbsp;<b>{menu.qty}</b>&nbsp;&nbsp;
                    </span>
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
                  <td width="5%" className="text-center align-middle">
                    <Button
                      size="sm"
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
        {cart?.list?.length > 0 && (
          <div className="footer">
            <button
              disabled={order.loading}
              onClick={() => {
                // dispatch(addToOrder(cart.list));
                setShow(true);
              }}
              type="button"
              class="btn btn-warning"
            >
              Confirm Order
            </button>
          </div>
        )}
      </Container>
      {show && (
        <ConfirmOrderModal
          data={cart.list}
          show={show}
          onHide={() => setShow(false)}
        />
      )}
    </div>
  );
};

export default Cart;
