import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Table, Container, Button } from "react-bootstrap";
import "./Order.scss";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import axios from "axios";
import CategoryModal from "../../shared/components/Modal/CategoryModal";

const Category = () => {
  const [view, setView] = useState(false);
  const [categories, setCategories] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    updateList();
  }, []);

  const updateList = () => {
    axios.get("http://localhost:5000/categories").then((res) => {
      setCategories(res.data);
    });
  };

  const deleteCategory = (id) => {
    axios.delete(`http://localhost:5000/categories/${id}`).then((res) => {
      updateList();
    });
  };

  return (
    <>
      <div className="cart-page">
        <div className="d-flex flex-row  flex-col justify-content-center">
          <h4>Categories</h4>
          <Button
            variant="warning"
            onClick={() => {
              setSelectedCategory({
                name: "",
              });
              setView(true);
            }}
          >
            + Add
          </Button>
        </div>
        <hr />
        <Container fluid-md>
          <Table
            variant={user?.data?.type === "admin" ? "light" : "warning"}
            bordered
            hover
            responsive
            size="sm"
            className="capture"
          >
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.map((item, index) => {
                return (
                  <tr key={item.id}>
                    <td>{index + 1}</td>
                    <td>{item?.name}</td>
                    <td width="10%" className="text-center">
                      <div className="d-flex flex-row flex-wrap justify-content-center">
                        <div style={{ marginRight: 5 }}>
                          <Button
                            style={{
                              marginRight: 3,
                            }}
                            size="sm"
                            variant="primary"
                            onClick={() => {
                              setSelectedCategory(item);
                              setView(true);
                            }}
                          >
                            <AiFillEdit />
                          </Button>
                        </div>
                        <div style={{ marginRight: 5 }}>
                          <Button
                            size="sm"
                            variant="danger"
                            onClick={() => {
                              deleteCategory(item.id);
                            }}
                          >
                            <AiFillDelete />
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Container>
      </div>
      {view && (
        <CategoryModal
          show={view}
          onHide={() => {
            setView(false);
            updateList();
          }}
          category={selectedCategory}
        />
      )}
    </>
  );
};

export default Category;
