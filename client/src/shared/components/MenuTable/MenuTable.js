import React, { useState } from "react";
import { Table, Container, Button, Image } from "react-bootstrap";
// import { useDispatch } from "react-redux";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import "./MenuTable.scss";
import Modal from "../Modal/MenuModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteMenu } from "../../../redux/reducers/menuReducer";

export const MenuTable = () => {
  const { list } = useSelector((state) => state.menu);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState({
    name: "",
    price: 0,
    photo: null,
  });

  const onHideModal = () => {
    setShowModal(false);
  };

  return (
    <div className="cart-page">
      {showModal && (
        <Modal show={showModal} onHide={onHideModal} menu={selectedMenu} />
      )}
      <div className="d-flex flex-row flex-wrap justify-content-between">
        <h4>Menu</h4>
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
      <hr />
      <Container fluid>
        <div className="w-100 text-right d-flex justify-content-end mb-2"></div>
        <Table striped borderless hover responsive>
          <thead>
            <tr>
              <th>Serial</th>
              <th>Image</th>
              <th>Name</th>
              <th>Price</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {list.map((menu, index) => {
              return (
                <tr key={menu.id}>
                  <td className="align-middle">{index + 1}</td>
                  <td>
                    <Image
                      height={50}
                      width={50}
                      src={menu.photo}
                      rounded
                      fluid
                    />
                  </td>
                  <td className="align-middle">{menu.name}</td>
                  <td className="align-middle">${menu.price}</td>
                  <td width="6%" className="text-center align-middle">
                    <div className="d-flex flex-row justify-content-around">
                      <Button
                        variant="danger"
                        onClick={() => {
                          // dispatch(removeMenuFromCart(menu));
                          dispatch(deleteMenu(menu));
                        }}
                      >
                        <AiFillDelete />
                      </Button>
                      <button
                        onClick={() => {
                          setShowModal(true);
                          setSelectedMenu({
                            id: menu.id,
                            name: menu.name,
                            price: menu.price,
                            photo: menu.photo,
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
