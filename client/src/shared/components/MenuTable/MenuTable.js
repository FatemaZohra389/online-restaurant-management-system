import { Table, Container, Button, Image } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  addMenuToCart,
  removeMenuFromCart,
  decreaseQtyFromCart,

} from "../../../redux/reducers/cartReducer";
import {addToOrder} from "../../../redux/reducers/orderReducer";
import { AiFillDelete } from "react-icons/ai";
import "./MenuTable.scss";
import Modal from "../Modal/Modal";
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
      <h1>Menu</h1>
      <div className="footer">
        <br></br>
      
          
        <> <Modal /> </>
   
          
          
         
        </div>
      <Container>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Serial</th>
              <th>Image</th>
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
                      src={menu.photo}
                      rounded
                      fluid
                    />
                  </td>
                  <td>{menu.name}</td>
                  <td>
                    <button onClick={() => dispatch(decreaseQtyFromCart(menu))}>
                      -
                    </button>
                    <span>&nbsp;{menu.qty}&nbsp;</span>
                    <button onClick={() => dispatch(addMenuToCart(menu))}>
                      +
                    </button>

                    {/* <button onClick={() => dispatch(reset())}>Reset</button> */}
                    {/* <button onClick={() => dispatch(decrement())}>Decrease</button> */}
                  </td>
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

                    <button type="button" class="btn btn-warning">Add</button>
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
        
      </Container>
    </div>
  );
};

export default Cart;
