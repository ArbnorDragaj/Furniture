import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "orderData";

export default function OrderPayment() {
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");

  function payNow() {
    alert("Payment successful!");
    localStorage.removeItem(STORAGE_KEY);
    navigate("/order");
  }

  if (!order) {
    return (
      <Container className="py-5">
        <Alert>No order found. Please create an order first.</Alert>
        <Button onClick={() => navigate("/order")}>Go to order</Button>
      </Container>
    );
  }

  return (
    <div className="page-bg">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={9} lg={6}>
            <Card className="shadow-sm rounded-4">
              <Card.Body className="p-4">
                <h3 className="mb-2">Payment</h3>
                <p className="text-muted" style={{ fontSize: 14 }}>
                  Total to pay: <strong>{order.total}</strong>
                </p>

                <div className="d-grid">
                  <Button onClick={payNow}>Pay now</Button>
                </div>

                <Row className="g-2 mt-3">
                  <Col xs={12} sm={6}>
                    <Button className="w-100" onClick={() => navigate("/order-details")}>
                      Back to details
                    </Button>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Button className="w-100" onClick={() => navigate("/order")}>
                      Back to order
                    </Button>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
