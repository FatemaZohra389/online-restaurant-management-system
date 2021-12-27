import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Container, Button } from "react-bootstrap";
import "./Order.scss";
import { AiFillEye } from "react-icons/ai";
import {
  fetchOrders,
  fetchUserOrders,
} from "../../redux/reducers/orderReducer";
import OrderView from "../../shared/components/Order/OrderView";
const Order = () => {
  const [view, setView] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orders = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    if (user && user.data.type === "customer") {
      dispatch(fetchUserOrders(user.data.id));
    } else if (user.data.type === "admin") {
      dispatch(fetchOrders());
    }
  }, [user]);

  const getTotalPrice = (carts) => {
    let total = 0;
    carts?.forEach((element) => {
      total += element.price * element.qty;
    });
    return total;
  };
  const onView = () => {
    setView(true);
  };
  const onViewHide = () => {
    setView(false);
    setSelectedOrder(null);
  };

  return (
    <>
      <div className="cart-page">
        <div className="m-2">
          <h4>Orders</h4>
        </div>
        <hr />

        <Container fluid>
          <Table striped borderless hover responsive size="sm">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Address</th>
                <th>Total Price</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.list?.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item?.id}</td>
                    <td>{new Date(item?.createdAt).toLocaleString()}</td>
                    <td>{item?.address}</td>
                    <td>${getTotalPrice(item?.carts)}</td>
                    <td>{item?.status}</td>
                    <td>
                      <td width="2%" className="text-center">
                        <div className="d-flex flex-row flex-wrap justify-content-around">
                          <Button
                            size="sm"
                            variant="primary"
                            onClick={() => {
                              onView();
                              setSelectedOrder(item);
                            }}
                          >
                            <AiFillEye />
                          </Button>
                        </div>
                      </td>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
      {view && (
        <OrderView show={view} onHide={onViewHide} order={selectedOrder} />
      )}
    </>
  );
};

export default Order;
