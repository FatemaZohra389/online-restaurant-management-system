import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table, Container, Button } from "react-bootstrap";
import "./Order.scss";
import { AiFillEye } from "react-icons/ai";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {
  fetchOrders,
  fetchUserOrders,
} from "../../redux/reducers/orderReducer";
import OrderView from "../../shared/components/Order/OrderView";
import OrderReviewModal from "../../shared/components/Order/OrderReviewModal";

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
    const marginY = (pageHeight - canvasHeight) / 2;
    pdf.addImage(imgData, "PNG", marginX, marginY, canvasWidth, canvasHeight);
    pdf.save("order_report.pdf");
  });
};

const Order = () => {
  const [view, setView] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const orders = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user && user?.data?.type === "customer") {
      dispatch(fetchUserOrders(user.data.id));
    } else if (user?.data?.type === "admin") {
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
          {user?.data?.type === "admin" && (
            <div
              style={{
                marginTop: 5,
                marginBottom: 5,
              }}
            >
              <Button onClick={() => _exportPdf()}>Print</Button>
            </div>
          )}
          <Table bordered hover responsive size="sm" className="capture">
            <thead>
              <tr>
                <th>Serial</th>
                <th>Order ID</th>
                <th>Date</th>
                <th>Address</th>
                <th>Total Price</th>
                <th>Status</th>
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
                    <td>{new Date(item?.createdAt).toLocaleString()}</td>
                    <td>{item?.address}</td>
                    <td>${getTotalPrice(item?.carts)}</td>
                    <td>{item?.status}</td>
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
                            <AiFillEye />
                          </Button>
                          {item?.status === "Complete" &&
                            !item?.review &&
                            user?.data?.type === "customer" && (
                              <Button
                                size="sm"
                                variant="warning"
                                onClick={() => {
                                  setSelectedOrder(item);
                                  setShowReview(true);
                                }}
                              >
                                Give Review
                              </Button>
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
