import axios from "axios";
import React, { useState, useEffect } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import "./Modal.scss";

function CategoryModal({ onHide, show, category }) {
  // const [show, setShow] = useState(false);
  const handleClose = () => onHide();
  const [name, setName] = useState("");

//   const [categories, setCategories] = useState(null);

  const updateCategory = (values) => {
    return new Promise((resolve, reject) => {
      axios
        .patch("http://localhost:5000/categories", { ...values })
        .then(function (response) {
          // handle success
          resolve(response.data);
        })
        .catch(function (error) {
          // handle error
          reject(error);
        });
    });
  };

  const addCategory = (values) => {
    return new Promise((resolve, reject) => {
      axios
        .post("http://localhost:5000/categories", { ...values })
        .then(function (response) {
          // handle success
          resolve(response.data);
        })
        .catch(function (error) {
          // handle error
          reject(error);
        });
    });
  };

  const onSubmit = () => {
    if (name) {
      if (category.id) {
        updateCategory({
          id: category.id,
          name: name,
        }).then((res) => {
          onHide();
        });
      } else {
        addCategory({
          name: name,
        }).then((res) => {
          onHide();
        });
      }
    }
  };

  useEffect(() => {
    setName(category.name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Modal show={show} onHide={handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>{category.id ? "Edit" : "Create"} Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <div style={{ padding: 10 }}>
              <Form.Group className="mb-2">
                <Form.Label>Category Name</Form.Label>
                <Form.Control
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Enter Category name"
                />
              </Form.Group>
            </div>
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

export default CategoryModal;
