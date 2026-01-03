import { Container, Row, Col, Card, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "orderData";

export default function OrderDetails() {
  const navigate = useNavigate();
  const order = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");

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
                <h3 className="mb-3">Order Details</h3>

                <p><strong>Name:</strong> {order.fullName}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Email:</strong> {order.email}</p>
                <p><strong>City:</strong> {order.city}</p>
                <p><strong>Address:</strong> {order.address}</p>

                <hr />

                <p><strong>Product:</strong> {order.product}</p>
                <p><strong>Quantity:</strong> {order.quantity}</p>
                {order.color ? <p><strong>Color:</strong> {order.color}</p> : null}
                {order.material ? <p><strong>Material:</strong> {order.material}</p> : null}
                {order.notes ? <p><strong>Notes:</strong> {order.notes}</p> : null}

                <div className="mt-3">
                  <p className="mb-0"><strong>Total:</strong> {order.total}</p>
                </div>

                {/* responsive buttons */}
                <Row className="g-2 mt-4">
                  <Col xs={12} sm={6}>
                    <Button className="w-100" onClick={() => navigate("/order")}>
                      Back
                    </Button>
                  </Col>
                  <Col xs={12} sm={6}>
                    <Button className="w-100" onClick={() => navigate("/order-payment")}>
                      Continue
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
