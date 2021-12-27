import React from "react";
import { Container, Table, Image, Modal } from "react-bootstrap";

const OrderView = ({ order, show, onHide }) => {
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
          <Table striped borderless hover responsive size="sm">
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
                    <td className="align-middle">{item.menu.name}</td>
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
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default OrderView;
