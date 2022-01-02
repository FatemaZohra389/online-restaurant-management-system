import "./Home.scss";
import img4 from "../../assets/images/img4.png";
import { Image, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import DashboardPage from "../Dashboard/DashboardPage";

function HomePage() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  if (user && user.data.type === "admin") {
    return <DashboardPage />;
  }
  
  return (
    <>
      <div>
        <section>
          <Row>
            <Col md={6}>
              <Image
                style={
                  {
                    // maxWidth: 550,
                  }
                }
                fluid
                src={img4}
                alt=""
              />
            </Col>
            <Col md={6}>
              <div
                style={
                  {
                    // width: "50%",
                  }
                }
                class="half-width flex-grow-1"
              >
                <h1>
                  <span class="orange-color">Skip</span> The Diet
                </h1>
                <h1>
                  Just Eat <span class="orange-color">Healthy</span>
                </h1>
                <h1>
                  With <span class="orange-color">Food Valley</span>
                </h1>
                <p>Imagine you don't need a diet because we provide </p>
                <p>healthy and delicious food for you .</p>

                <br></br>
                <button class="order-link" onClick={() => navigate("/menu")}>
                  Order Here
                </button>
              </div>
            </Col>
          </Row>
          {/* <div className="d-flex flex-row flex-wrap justify-content-around align-items-center w-100">
            <div class="half-width">
              <Image
                style={{
                  maxWidth: 450,
                }}
                src={img4}
                alt=""
              />
            </div>
            <div
              style={
                {
                  // width: "50%",
                }
              }
              class="half-width flex-grow-1"
            >
              <h1>
                <span class="orange-color">Skip</span> The Diet
              </h1>
              <h1>
                Just Eat <span class="orange-color">Healthy</span>
              </h1>
              <h1>
                With <span class="orange-color">Food Valley</span>
              </h1>
              <p>Imagine you don't need a diet because we provide </p>
              <p>healthy and delicious food for you .</p>

              <br></br>
              <button class="order-link" onClick={() => navigate("/menu")}>
                Order Here
              </button>
            </div>
          </div> */}
        </section>
      </div>
    </>
  );
}

export default HomePage;
