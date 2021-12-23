import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import "./Menu.scss";
import { addMenuToCart } from "../../redux/reducers/cartReducer";
import MenuTable from "../../shared/components/MenuTable/MenuTable";

function Menu() {
  const [menus, setMenus] = useState([]);
  const { addToast } = useToasts();
  // const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // console.log({ cart });
  // const navigate = useNavigate();
  const onClickCart = (menu) => {
    // console.log("cliecked", menu)
    dispatch(addMenuToCart(menu));
    addToast(`1 ${menu.name} added to Cart`, {
      appearance: "success",
      autoDismiss: true,
    });
    //navigate("/cart");
  };

  const updateList = () => {
    axios
      .get("http://localhost:5000/menus")
      .then(function (response) {
        // handle success
        setMenus(response.data);
      })
      .catch(function (error) {
        // handle error
      });
  };

  useEffect(() => {
    updateList();
  }, []);

  console.log(menus);
  return (
    <div className="menu-page p-3">
      {/* Admin table */}
      <>
        <MenuTable list={menus} />
      </>

      <Row xs={1} md={12} className="g-4">
        {menus.map((menu, idx) => (
          <Col key={menu.id} md={3}>
            <Card>
              <Card.Img variant="top" src={menu.photo} />
              <Card.Body>
                <Card.Title>{menu.name}</Card.Title>
                <div className="d-flex justify-content-between align-items-center">
                  <Card.Subtitle>$ {menu.price}</Card.Subtitle>

                  <Button onClick={() => onClickCart(menu)} variant="warning">
                    <AiOutlineShoppingCart />
                    &nbsp;Add
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Menu;
