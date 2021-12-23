import React, { useState } from "react";
import { Button, Modal,Form,InputGroup } from "react-bootstrap";
import "./Modal.scss";
const MenuModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
 
      <>
        <Button variant="warning" onClick={handleShow}>
          Add
        </Button>

        <Modal show={show} onHide={handleClose} animation={false}>
          
          
            <InputGroup className="mb-5">
            <Form style={{ padding: 10 }}>
          <Form.Group>
            <Form.Label> Menu Name</Form.Label>
            <Form.Control type="text"
                          placeholder="Enter Menu name" />
          </Form.Group>
          <Form.Group>
            <Form.Label> Menu Price</Form.Label>
            <Form.Control
              type="number"
              placeholder="Enter Menu price"
            />
          </Form.Group>
          
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control type="number" 
                          placeholder="Enter image" />
          </Form.Group>
          
          <Button variant="warning" type="submit">
             submit 
          </Button>
        </Form>
      </InputGroup>
   
         </Modal>
    

        
     </>
  
  );
};

export default MenuModal;
