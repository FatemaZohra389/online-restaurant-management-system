import React, { useEffect } from "react";
import {
  Modal,
  Form,
  //   Checkbox,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import { addToOrder } from "../../../redux/reducers/orderReducer";
import { useSelector, useDispatch } from "react-redux";

const ConfirmOrderModal = ({ data, show, onHide, onConfirm }) => {
  const user = useSelector((state) => state.user);
  const [address, setAddress] = React.useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    setAddress(user.data.address);
  }, [user]);

  return (
    <Modal show={show}>
      <div className="modal-container">
        <div className="modal-header">
          <h5 className="modal-title">Confirm Order</h5>
          {/* <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button> */}
        </div>
        <div className="modal-body">
          {/* <p>Are you sure you want to confirm your order?</p> */}
          <div className="form-wrapper">
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">Address</InputGroup.Text>
              <FormControl
                defaultValue={address}
                onChange={(e) => setAddress(e.target.value)}
                as="textarea"
                aria-label="address"
                placeholder="Enter your address here"
              />
            </InputGroup>
          </div>
          <Form.Check
            // disabled
            checked={true}
            type="checkbox"
            label="Cash on Delivery"
            id="custom-checkbox"
          />
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
              dispatch(addToOrder(data, address));
              onHide(false);
            }}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmOrderModal;
