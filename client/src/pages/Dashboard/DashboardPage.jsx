import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Alert, Card } from "react-bootstrap";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import BarGraph from "../../shared/components/Statistics/BarGraph";

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
            <Alert.Heading>Total Customers</Alert.Heading>
            <hr />
            <h1 className="mb-0">{data?.users}</h1>
          </Alert>
        </Col>
        <Col md={4}>
          <Alert variant="success">
            <Alert.Heading>Total Orders</Alert.Heading>
            <hr />
            <h1 className="mb-0">{data?.orders?.totalOrderAllTime}</h1>
          </Alert>
        </Col>
        <Col md={4}>
          <Alert variant="info">
            <Alert.Heading>Total Income</Alert.Heading>
            <hr />
            <h1 className="mb-0">${data?.totalEarnings}</h1>
          </Alert>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <Card>
            <Card.Header>Orders / Current Month</Card.Header>
            <Card.Body>
              <BarGraph data={data?.orders?.currentMonth?.stat} />
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Header>Orders / Current Year</Card.Header>
            <Card.Body>
              <BarGraph data={data?.orders?.currentYear?.stat} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DashboardPage;
