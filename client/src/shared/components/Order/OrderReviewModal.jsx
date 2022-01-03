import axios from "axios";
import React from "react";
import {
  Modal,
  //   Form,
  //   Checkbox,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { useDispatch } from "react-redux";
import { fetchOrders } from "../../../redux/reducers/orderReducer";

const OrderReviewModal = ({ show, onHide, order }) => {
  const [review, setReview] = React.useState("");
  const dispatch = useDispatch();
  return (
    <Modal show={show}>
      <div className="modal-header">
        <h5 className="modal-title">Write Review</h5>
      </div>
      <div className="modal-container">
        <div className="modal-body">
          {/* <p>Are you sure you want to confirm your order?</p> */}
          <div className="form-wrapper">
            <InputGroup className="mb-3">
              <FormControl
                // defaultValue={address}
                onChange={(e) => setReview(e.target.value)}
                as="textarea"
                aria-label="address"
                placeholder="Write your review here"
              />
            </InputGroup>
          </div>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={onHide}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-warning"
            onClick={() => {
              axios
                .patch("http://localhost:5000/orders/review", {
                  review,
                  orderId: order?.id,
                })
                .then((res) => {
                  dispatch(fetchOrders());
                })
                .catch((e) => {
                  console.error(e);
                })
                .finally(() => {
                  onHide();
                });
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default OrderReviewModal;
