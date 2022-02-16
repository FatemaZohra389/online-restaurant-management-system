import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Container, Button } from "react-bootstrap";
import "./Order.scss";
import { AiFillEye, AiFillPrinter, AiFillEdit } from "react-icons/ai";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  fetchOrders,
  fetchUserOrders,
} from "../../redux/reducers/orderReducer";
import OrderView from "../../shared/components/Order/OrderView";
import OrderReviewModal from "../../shared/components/Order/OrderReviewModal";
import { fetchCustomers } from "../../redux/reducers/customerReducer";
import Select from "react-select";
import axios from "axios";

const orderStatusList = [
  { value: "Placed", label: "Placed" },
  { value: "Confirm", label: "Confirm" },
  { value: "Prepared", label: "Prepared" },
  { value: "Delivered", label: "Delivered" },
  { value: "Complete", label: "Complete" },
  { value: "Cancelled", label: "Cancelled" },
];

const _exportPdf = () => {
  html2canvas(document.querySelector(".capture")).then((canvas) => {
    // document.body.appendChild(canvas); // if you want see your screenshot in body.
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF();
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const widthRatio = pageWidth / canvas.width;
    const heightRatio = pageHeight / canvas.height;
    const ratio = widthRatio > heightRatio ? heightRatio : widthRatio;
    const canvasWidth = canvas.width * ratio;
    const canvasHeight = canvas.height * ratio;

    const marginX = (pageWidth - canvasWidth) / 2;
    // const marginY = (pageHeight - canvasHeight) / 2;
    pdf.addImage(imgData, "PNG", marginX, 0, canvasWidth, canvasHeight);
    pdf.save("order_report.pdf");
  });
};

const Order = () => {
  const [view, setView] = useState(false);
  const [customerId, setCustomerId] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [status, setStatus] = useState(null);

  const [showReview, setShowReview] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orders = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const customer = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user?.data?.type === "admin") {
      dispatch(fetchCustomers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    if (user && user?.data?.type === "customer") {
      dispatch(fetchUserOrders(user.data.id));
    } else if (user?.data?.type === "admin") {
      dispatch(fetchOrders());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const updateStatus = (order, status) => {
    axios
      .patch("http://localhost:5000/orders/receive", {
        id: order.id,
      })
      .then(() => {
        dispatch(fetchOrders());
      });
  };

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

  const styles = {
    control: (css) => ({
      ...css,
      width: 200,
    }),
    menu: ({ width, ...css }) => ({
      ...css,
      width: "max-content",
      minWidth: "100%",
    }),
    // Add padding to account for width of Indicators Container plus padding
    option: (css) => ({ ...css, width: "100%" }),
  };

  const updateList = (customerId, status, orderId) => {
    let params = {};
    if (customerId) {
      params.customerId = customerId;
    }
    if (status) {
      params.status = status;
    }
    if (orderId) {
      params.orderId = orderId;
    }
    dispatch(fetchOrders(params));
  };

  return (
    <>
      <div className="cart-page">
        <div className="m-2">
          <h4>Orders</h4>
        </div>
        <hr />
        <Container fluid-md>
          {user?.data?.type === "admin" && (
            <div
              style={{
                marginTop: 5,
                marginBottom: 5,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                flexWrap: "wrap",
              }}
            >
              <div className="d-flex flex-row flex-wrap justify-content-start">
                <div style={{ marginRight: 5 }}>
                  <Select
                    autoSize={false}
                    styles={styles}
                    isSearchable
                    isClearable
                    options={customer.list.map((customer) => ({
                      value: customer.id,
                      label: customer.username,
                    }))}
                    placeholder="Select Customer"
                    onChange={(value) => {
                      if (value && value.value) {
                        setCustomerId(value.value);
                        updateList(value.value, status, orderId);
                      } else {
                        setCustomerId(null);
                        updateList(null, status, orderId);
                      }
                    }}
                  />
                </div>
                <div style={{ marginRight: 5 }}>
                  <Select
                    autoSize={false}
                    styles={styles}
                    isSearchable
                    isClearable
                    options={orderStatusList}
                    placeholder="Select Status"
                    onChange={async (value) => {
                      if (value && value.value) {
                        setStatus(value.value);
                        updateList(customerId, value.value, orderId);
                      } else {
                        setStatus(null);
                        updateList(customerId, null, orderId);
                      }
                    }}
                  />
                </div>
                <Select
                  autoSize={false}
                  styles={styles}
                  isSearchable
                  isClearable
                  options={orders?.list.map((item) => ({
                    value: item.id,
                    label: item.id,
                  }))}
                  placeholder="Select Order"
                  onChange={(value) => {
                    if (value && value.value) {
                      setOrderId(value.value);
                      updateList(customerId, status, value.value);
                    } else {
                      setOrderId(null);
                      updateList(customerId, status, null);
                    }
                  }}
                />
              </div>
              <Button variant="info" onClick={() => _exportPdf()}>
                <span>
                  <AiFillPrinter />
                  &nbsp;Print
                </span>
              </Button>
            </div>
          )}
          <Table
            variant={user?.data?.type === "admin" ? "light" : "warning"}
            bordered
            hover
            responsive
            size="sm"
            className="capture"
          >
            <thead>
              <tr>
                <th>Serial</th>
                <th>Order ID</th>
                {user?.data?.type === "admin" && <th>Customer</th>}
                <th>Date</th>
                <th>Address</th>
                <th>Total Price</th>
                <th>Status</th>
                {user?.data?.type === "admin" && <th>Payment Method</th>}
                <th>Review</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders?.list?.map((item, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{item?.id}</td>
                    {user?.data?.type === "admin" && (
                      <td>{item?.user?.username}</td>
                    )}
                    <td>{new Date(item?.createdAt).toLocaleString()}</td>
                    <td>{item?.address}</td>
                    <td>{getTotalPrice(item?.carts)} Tk</td>
                    <td>{item?.status}</td>
                    {user?.data?.type === "admin" && <td>Cash on Delivery</td>}
                    <td>{item?.review}</td>
                    <td>
                      <td width="2%" className="text-center">
                        <div className="d-flex flex-row flex-wrap justify-content-center">
                          <Button
                            style={{
                              marginRight: 3,
                            }}
                            size="sm"
                            variant="primary"
                            onClick={() => {
                              onView();
                              setSelectedOrder(item);
                            }}
                          >
                            {user?.data?.type === "admin" ? (
                              <AiFillEdit />
                            ) : (
                              <AiFillEye />
                            )}
                          </Button>
                          {item?.status === "Complete" &&
                            !item?.review &&
                            user?.data?.type === "customer" && (
                              <React.Fragment>
                                <Button
                                  size="sm"
                                  variant="warning"
                                  onClick={() => {
                                    setSelectedOrder(item);
                                    setShowReview(true);
                                  }}
                                  className="me-1"
                                >
                                  Give Review
                                </Button>
                              </React.Fragment>
                            )}
                          {item?.status === "Delivered" &&
                            !item?.review &&
                            user?.data?.type === "customer" && (
                              <React.Fragment>
                                <Button
                                  size="sm"
                                  variant="info"
                                  onClick={() => {
                                    // setSelectedOrder(item);
                                    updateStatus(item, "Received");
                                  }}
                                >
                                  Receive
                                </Button>
                              </React.Fragment>
                            )}
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
      {showReview && (
        <OrderReviewModal
          order={selectedOrder}
          onHide={() => {
            setShowReview(false);
            setSelectedOrder(null);
          }}
          show={showReview}
        />
      )}
    </>
  );
};

export default Order;
