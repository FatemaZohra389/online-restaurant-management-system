import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
import axios from "axios";
import img1 from "./../../assets/images/img1.jpg";
import img2 from "./../../assets/images/img2.jpg";
import img3 from "./../../assets/images/img3.jpg";
import img5 from "./../../assets/images/img5.png";
import "./Menu.scss";
import { addMenuToCart } from "../../redux/reducers/cartReducer";
import MenuTable from "../../shared/components/MenuTable/MenuTable";


const dummyData = [
  {
    id: 1,
    name: "Chicken Stake",
    price: 500,
    img: img1,
  },
  {
    id: 2,
    name: "Italian Pasta",
    price: 200,
    img: img2,
  },
  {
    id: 3,
    name: "Chicken Salad",
    price: 300,
    img: img3,
  },
  {
    id: 4,
    name: "Noodles",
    price: 300,
    img: img5,
  },
  {
    id: 5,
    name: "Chicken Stake",
    price: 500,
    img: img1,
  },
  {
    id: 6,
    name: "Italian Pasta",
    price: 200,
    img: img2,
  },
  {
    id: 7,
    name: "Chicken Salad",
    price: 300,
    img: img3,
  },
  {
    id: 8,
    name: "Noodles",
    price: 300,
    img: img5,
  },
];



function Menu() {
  const [menus, setMenus] = useState([]);
  const { addToast } = useToasts();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  // console.log({ cart });
  const navigate = useNavigate();
  const onClickCart = (menu) => {
    // console.log("cliecked", menu)
    dispatch(addMenuToCart(menu));
    addToast(`1 ${menu.name} added to Cart`, {
      appearance: "success",
      autoDismiss: true,
    });
    //navigate("/cart");
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/menus")
      .then(function (response) {
        // handle success
        setMenus(response.data);
      })
      .catch(function (error) {
        // handle error
      });
  }, []);


  console.log(menus);
return (
    <div className="menu-page p-3">
      {/* Admin table */}
      <> <MenuTable /> </>
 


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
   
    )  }
          
          export default Menu;