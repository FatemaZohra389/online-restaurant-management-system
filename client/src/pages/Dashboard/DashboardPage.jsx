import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Alert, Card } from "react-bootstrap";
import BarGraph from "../../shared/components/Statistics/BarGraph";
import CommonPieChart from "../../shared/components/Statistics/CommonPieChart";

const DashboardPage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/stats").then((res) => {
      setData(res.data);
    });
  }, []);
  return (
    <Container fluid className="mt-4">
      <Row>
      <Col md={4}>
        <Alert variant="danger">
          <Alert.Heading>Customers</Alert.Heading>
          <hr />
          <h1 className="mb-0">{data?.users}</h1>
        </Alert>
      </Col>
        <Col md={4}>
          <Alert variant="success">
            <Alert.Heading>Today's Orders</Alert.Heading>
            <hr />
            <h1 className="mb-0">{data?.orders?.today?.total}</h1>
          </Alert>
        </Col>
        <Col md={4}>
          <Alert variant="info">
            <Alert.Heading>Today's Income</Alert.Heading>
            <hr />
            <h1 className="mb-0">${data?.orders?.today?.income}</h1>
          </Alert>
        </Col>
      </Row>
      <Row xs={1} md={12} className="g-4 mb-4">
        <Col md={6}>
          <CommonPieChart data={data?.orders?.today?.stat} />
          <div className="d-flex flex-row justify-content-center align-items-end">
            <h5>Daily Order Summary</h5>
          </div>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Orders / Today</Card.Header>
            <Card.Body>
              <BarGraph data={data?.orders?.today?.stat} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Alert variant="info">
            <Alert.Heading>Current Month's Orders</Alert.Heading>
            <hr />
            <h1 className="mb-0">{data?.orders?.currentMonth?.total}</h1>
          </Alert>
        </Col>
        <Col md={6}>
          <Alert variant="primary">
            <Alert.Heading>Current Month's Income</Alert.Heading>
            <hr />
            <h1 className="mb-0">${data?.orders?.currentMonth?.income}</h1>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Orders / Current Month</Card.Header>
            <Card.Body>
              <BarGraph
                data={data?.orders?.currentMonth?.stat}
                color="#00C49F"
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <CommonPieChart data={data?.orders?.currentMonth?.stat} />
          <div className="d-flex flex-row justify-content-center align-items-end">
            <h5>Monthly Order Summary</h5>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Alert variant="primary">
            <Alert.Heading>Current Year's Orders</Alert.Heading>
            <hr />
            <h1 className="mb-0">{data?.orders?.currentYear?.total}</h1>
          </Alert>
        </Col>
        <Col md={6}>
          <Alert variant="success">
            <Alert.Heading>Current Year's Income</Alert.Heading>
            <hr />
            <h1 className="mb-0">${data?.orders?.currentYear?.income}</h1>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Orders / Current Year</Card.Header>
            <Card.Body>
              <BarGraph
                data={data?.orders?.currentYear?.stat}
                color="#0088FE"
              />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <CommonPieChart data={data?.orders?.currentYear?.stat} />
          <div className="d-flex flex-row justify-content-center align-items-end">
            <h5>Yearly Order Summary</h5>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6}>
          <Alert variant="success">
            <Alert.Heading>Total Orders</Alert.Heading>
            <hr />
            <h1 className="mb-0">{data?.orders?.totalOrderAllTime}</h1>
          </Alert>
        </Col>
        <Col md={6}>
          <Alert variant="danger">
            <Alert.Heading>Total Income</Alert.Heading>
            <hr />
            <h1 className="mb-0">${data?.totalEarnings}</h1>
          </Alert>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
