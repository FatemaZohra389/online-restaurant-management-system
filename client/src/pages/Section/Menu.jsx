import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { InputGroup, FormControl } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useToasts } from "react-toast-notifications";
// import axios from "axios";
import "./Menu.scss";
import { addMenuToCart } from "../../redux/reducers/cartReducer";
import MenuTable from "../../shared/components/MenuTable/MenuTable";
import { fetchMenu, setMenuFilters } from "../../redux/reducers/menuReducer";
import axios from "axios";
import Select from "react-select";
import { AiOutlineSearch } from "react-icons/ai";

function Menu() {
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const { list } = useSelector((state) => state.menu);
  const user = useSelector((state) => state.user);
  const [categories, setCategories] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchValue, setSearchValue] = useState("");

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

  useEffect(() => {
    let params = {};
    if (selectedCategory) {
      params.categoryId = selectedCategory;
    }
    if (searchValue !== "" && searchValue !== null) {
      params.searchValue = searchValue;
    }
    dispatch(setMenuFilters({ ...params }));
    // dispatch(fetchMenu(params));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCategory, searchValue]);

  useEffect(() => {
    axios.get("http://localhost:5000/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const styles = {
    control: (css) => ({
      ...css,
      width: 200,
    }),
    menu: ({ width, ...css }) => ({
      ...css,
      width: "max-content",
      minWidth: "100%",
    }),
    // Add padding to account for width of Indicators Container plus padding
    option: (css) => ({ ...css, width: "100%" }),
  };

  return (
    <div className="menu-page p-3">
      {/* Admin table */}
      <div
        style={{
          marginTop: 5,
          marginBottom: 5,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className="d-flex flex-row flex-wrap justify-content-start my-2">
          <div style={{ marginRight: 5 }}>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon1">
                <AiOutlineSearch />
              </InputGroup.Text>
              <FormControl
                onChange={(event) => {
                  setSearchValue(event.target.value);
                }}
                placeholder="Find Menu"
                aria-label="Seach"
                aria-describedby="basic-addon1"
              />
            </InputGroup>
          </div>
          <div style={{ marginRight: 5 }}>
            <Select
              autoSize={false}
              styles={styles}
              isSearchable
              isClearable
              options={categories?.map((item) => ({
                value: item.id,
                label: item.name,
              }))}
              placeholder="Filter by Category"
              onChange={(value) => {
                if (value && value.value) {
                  setSelectedCategory(value.value);
                } else {
                  setSelectedCategory(null);
                }
              }}
            />
          </div>
        </div>
      </div>
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

                    <Button
                      size="sm"
                      onClick={() => onClickCart(menu)}
                      variant="warning"
                    >
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
