import React, { useEffect } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
// import axios from "axios";
import "./Menu.scss";
import { addMenuToCart } from "../../redux/reducers/cartReducer";
import MenuTable from "../../shared/components/MenuTable/MenuTable";
import { fetchMenu } from "../../redux/reducers/menuReducer";

function Menu() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.menu);
  const user = useSelector((state) => state.user);

  const onClickCart = (menu) => {
    dispatch(addMenuToCart(menu));
    addToast(`1 ${menu.name} added to Cart`, {
      appearance: "success",
      autoDismiss: true,
    });
  };

  useEffect(() => {
    dispatch(fetchMenu());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="menu-page p-3">
      {/* Admin table */}
      {user.data.type === "admin" && (
        <>
          <MenuTable />
        </>
      )}

      {user.data.type === "customer" && (
        <Row xs={1} md={12} className="g-4">
          {list.map((menu, idx) => (
            <Col key={menu.id} md={3}>
              <Card>
                <Card.Img variant="top" src={menu.photo} />
                <Card.Body>
                  <Card.Title>{menu.name}</Card.Title>
                  <div className="d-flex justify-content-between align-items-center">
                    <Card.Subtitle>$ {menu.price}</Card.Subtitle>

                    <Button size="sm" onClick={() => onClickCart(menu)} variant="warning">
                      <AiOutlineShoppingCart />
                      &nbsp;Add
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default Menu;
