import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addMenu, updateMenu } from "../../../redux/reducers/menuReducer";
import "./Modal.scss";

function MenuModal({ onHide, show, menu }) {
  // const [show, setShow] = useState(false);
  const handleClose = () => onHide();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [photo, setPhoto] = useState(null);

  const onSubmit = () => {
    if (name && photo && price) {
      if (menu.id) {
        dispatch(
          updateMenu({
            id: menu.id,
            name: name,
            photo: photo,
            price: price,
          })
        ).then((res) => {
          onHide();
        });
      } else {
        dispatch(
          addMenu({
            name: name,
            photo: photo,
            price: price,
          })
        ).then((res) => {
          onHide();
        });
      }
    }
  };

  useEffect(() => {
    setName(menu.name);
    setPhoto(menu.photo);
    setPrice(menu.price);
  }, []);

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
          <Modal.Title>{menu.id ? "Edit" : "Create"} Menu</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form style={{ padding: 10 }}>
              <Form.Group className="mb-2">
                <Form.Label> Menu Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter Menu name"
                />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label> Menu Price</Form.Label>
                <Form.Control
                  value={price}
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
