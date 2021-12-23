import React, { useState } from "react";
import { Table, Container, Button, Image } from "react-bootstrap";
// import { useDispatch } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./MenuTable.scss";
import Modal from "../Modal/MenuModal";

export const MenuTable = ({ list }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState({
    name: "",
    price: 0,
    photo: null,
  });
  // const dispatch = useDispatch();

  const onHideModal = () => {
    setShowModal(false);
  };

  return (
    <div className="cart-page">
      {showModal && (
        <Modal show={showModal} onHide={onHideModal} menu={selectedMenu} />
      )}
      <h1>Menu</h1>
      <Container>
        <div className="w-100 text-right d-flex justify-content-end mb-2">
          <Button
            variant="warning"
            onClick={() => {
              setShowModal(true);
              setSelectedMenu({
                name: "",
                price: 0,
                photo: null,
              });
            }}
          >
            + Add
          </Button>
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Serial</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((menu, index) => {
              return (
                <tr key={menu.id}>
                  <td>{index + 1}</td>
                  <td>
                    <Image
                      height={50}
                      width={50}
                      src={menu.photo}
                      rounded
                      fluid
                    />
                  </td>
                  <td>{menu.name}</td>
                  <td>$ {menu.price}</td>
                  <td>
                    <div className="d-flex flex-row justify-content-around">
                      <Button
                        variant="danger"
                        onClick={() => {
                          // dispatch(removeMenuFromCart(menu));
                        }}
                      >
                        <AiFillDelete />
                      </Button>
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setSelectedMenu({
                            ...menu,
                          });
                        }}
                        type="button"
                        className="btn btn-primary"
                      >
                        <AiFillEdit />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};

export default MenuTable;
