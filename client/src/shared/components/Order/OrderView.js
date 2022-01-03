import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Table, Image, Modal, Card, Form } from "react-bootstrap";
import { fetchOrders } from "../../../redux/reducers/orderReducer";

const OrderView = ({ order, show, onHide }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const updateStatus = (status) => {
    axios
      .patch("http://localhost:5000/orders", {
        id: order.id,
        status: status,
      })
      .then(() => {
        dispatch(fetchOrders());
      });
  };
  const getTotalPrice = () => {
    let total = 0;
    order?.carts?.forEach((element) => {
      total += element.price * element.qty;
    });
    return total;
  };
  const onHideModal = () => {
    onHide();
  };
  return (
    <Modal centered closeButton show={show} onHide={onHideModal}>
      <Modal.Header closeButton>
        <Modal.Title>Order #{order?.id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container fluid>
          {user.data.type === "admin" && (
            <Card className="mb-3">
              <Card.Body>
                <Form.Group className="mb-2">
                  <Form.Label>
                    <b>Change Status</b>
                  </Form.Label>
                  <Form.Select
                    onChange={(e) => {
                      updateStatus(e.target.value);
                    }}
                    defaultValue={order.status}
                    aria-label="Default select example"
                  >
                    <option value="Placed">Placed</option>
                    <option value="Confirm">Confirm</option>
                    <option value="Prepared">Prepared</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Complete">Complete</option>
                    <option value="Cancelled">Cancelled</option>
                  </Form.Select>
                </Form.Group>
              </Card.Body>
            </Card>
          )}
          <Table bordered hover responsive size="sm" variant="light">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {order?.carts.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td className="align-middle">{index + 1}</td>
                    <td>
                      <Image
                        height={50}
                        width={50}
                        src={item.menu.photo}
                        rounded
                        fluid
                      />
                    </td>
                    <td className="align-middle">{item.name}</td>
                    <td className="align-middle">
                      <span>{item.qty}</span>
                    </td>
                    <td className="align-middle">${item.price}</td>
                    <td className="align-middle">${item.price * item.qty}</td>
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
          <Card>
            <Card.Body>
              <Table borderless striped>
                <tbody>
                  <tr>
                    <td>Customer</td>
                    <td>{order?.user?.name}</td>
                  </tr>
                  <tr>
                    <td>Address</td>
                    <td><b>{order?.address}</b></td>
                  </tr>
                  <tr>
                    <td>Phone</td>
                    <td>{order?.user?.phone}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td><b>{order?.status}</b></td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default OrderView;
