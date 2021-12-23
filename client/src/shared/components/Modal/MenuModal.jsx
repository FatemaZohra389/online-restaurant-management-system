import React, { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./Modal.scss";

function MenuModal({ onHide, show }) {
  // const [show, setShow] = useState(false);
  const handleClose = () => onHide();
  // const handleShow = () => setShow(true);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState(null);

  const onSubmit = () => {
    console.log({ name, price, photo });
  };

  /**
   * Convert image to base64
   * @param {*} file 
   */
  const getBase64 = (file) => {
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        setPhoto(reader.result);
      };
      reader.onerror = function (error) {
        // console.log("Error: ", error);
      };
    } catch (e) {}
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>Create Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form style={{ padding: 10 }}>
              <Form.Group className="mb-2">
                <Form.Label> Menu Name</Form.Label>
                <Form.Control
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter Menu name"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label> Menu Price</Form.Label>
                <Form.Control
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                  placeholder="Enter Menu price"
                />
              </Form.Group>
              <Form.Group className="my-2">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  placeholder="Enter image"
                  onChange={(event) => {
                    getBase64(event.target.files[0]);
                  }}
                  accept="image/png, image/gif, image/jpeg"
                />
              </Form.Group>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" type="button" onClick={onSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default MenuModal;
