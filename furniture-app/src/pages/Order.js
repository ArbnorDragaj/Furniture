import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Card,
  Button,
  Alert,
} from "react-bootstrap";

const STORAGE_KEY = "orderData";

const PRODUCTS = [
  { value: "", label: "Select a product", price: 0, disabled: true },
  { value: "sofa", label: "Sofa", price: 450 },
  { value: "chair", label: "Chair", price: 120 },
  { value: "table", label: "Table", price: 280 },
  { value: "bed", label: "Bed", price: 520 },
];

export default function Order() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: "",
    phone: "+383",
    email: "",
    city: "",
    address: "",
    product: "",
    quantity: 1,
    color: "",
    material: "",
    notes: "",
  });

  const [error, setError] = useState("");

  const total = useMemo(() => {
    const p = PRODUCTS.find((x) => x.value === form.product);
    const price = p?.price || 0;
    const qty = Math.max(1, Number(form.quantity || 1));
    return price * qty;
  }, [form.product, form.quantity]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    setError("");
  }

  function handlePhoneChange(e) {
    let value = e.target.value;

    // lejo vetem "+" dhe numra
    value = value.replace(/[^0-9+]/g, "");

    // mos lejo me e fshi +383
    if (!value.startsWith("+383")) {
      value = "+383";
    }

    setForm((prev) => ({ ...prev, phone: value }));
    setError("");
  }
  // validimi i fushave
  function validateBasic() {
    if (!form.fullName.trim()) return "Full name is required.";

    if (!form.phone.trim()) return "Phone number is required.";

    // +383 dhe 8  shifra pas +383 (p.sh. +38344123456)
    const phoneRegex = /^\+383\d{8}$/;
    if (!phoneRegex.test(form.phone)) {
      return "Phone must start with +383 and contain only numbers (example: +38344123456). You mus have 8 numbers after +383";
    }
    
    if (!form.email.trim()) return "Email is required.";
    if (!form.city.trim()) return "City is required.";
    if (!form.address.trim()) return "Address is required.";
    if (!form.product) return "Please select a product.";

    const q = Number(form.quantity);
    if (!q || q < 1) return "Quantity must be at least 1.";

    return "";
  }

  function saveOrder() {
    const data = {
      ...form,
      quantity: Math.max(1, Number(form.quantity || 1)),
      total: `${total}€`,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function goPayment(e) {
    e.preventDefault();
    const msg = validateBasic();
    if (msg) return setError(msg);

    saveOrder();
    navigate("/order-payment");
  }

  function goDetails() {
    const msg = validateBasic();
    if (msg) return setError(msg);

    saveOrder();
    navigate("/order-details");
  }

  return (
    <div className="page-bg">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col xs={12} md={9} lg={6}>
            <Card className="shadow-sm rounded-4">
              <Card.Body className="p-4">
                <h3 className="mb-1">Place Your Order</h3>
                <p className="text-muted mb-4" style={{ fontSize: 14 }}>
                  Fill in your details and choose the product you want.
                </p>

                {error ? <Alert className="py-2">{error}</Alert> : null}

                <Form onSubmit={goPayment}>
                  <Row className="g-3">
                    <Col md={6}>
                      <Form.Label className="mb-1">Full Name</Form.Label>
                      <Form.Control
                        name="fullName"
                        value={form.fullName}
                        onChange={handleChange}
                        placeholder="John Doe"
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Label className="mb-1">Phone</Form.Label>
                      <Form.Control
                        name="phone"
                        value={form.phone}
                        onChange={handlePhoneChange}
                        placeholder="+38344123456"
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Label className="mb-1">Email</Form.Label>
                      <Form.Control
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="example@gmail.com"
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Label className="mb-1">City</Form.Label>
                      <Form.Control
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Prishtina"
                      />
                    </Col>

                    <Col md={12}>
                      <Form.Label className="mb-1">Address</Form.Label>
                      <Form.Control
                        name="address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Street, number, entrance..."
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Label className="mb-1">Choose Product</Form.Label>
                      <Form.Select
                        name="product"
                        value={form.product}
                        onChange={handleChange}
                      >
                        {PRODUCTS.map((p) => (
                          <option
                            key={p.value || "empty"}
                            value={p.value}
                            disabled={p.disabled}
                          >
                            {p.label}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>

                    <Col md={6}>
                      <Form.Label className="mb-1">Quantity</Form.Label>
                      <Form.Control
                        name="quantity"
                        type="number"
                        min="1"
                        value={form.quantity}
                        onChange={handleChange}
                      />
                    </Col>

                    <Col md={6}>
                      <Form.Label className="mb-1">Color</Form.Label>
                      <Form.Select
                        name="color"
                        value={form.color}
                        onChange={handleChange}
                      >
                        <option value="">Select color</option>
                        <option value="white">White</option>
                        <option value="gray">Gray</option>
                        <option value="black">Black</option>
                      </Form.Select>
                    </Col>

                    <Col md={6}>
                      <Form.Label className="mb-1">Material</Form.Label>
                      <Form.Select
                        name="material"
                        value={form.material}
                        onChange={handleChange}
                      >
                        <option value="">Select material</option>
                        <option value="wood">Wood</option>
                        <option value="metal">Metal</option>
                        <option value="fabric">Fabric</option>
                        <option value="leather">Leather</option>
                      </Form.Select>
                    </Col>

                    <Col md={12}>
                      <Form.Label className="mb-1">Additional Notes</Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={3}
                        name="notes"
                        value={form.notes}
                        onChange={handleChange}
                        placeholder="Floor, entrance, special requests..."
                      />
                    </Col>
                  </Row>

                  <div className="mt-4 p-4 rounded-4 border bg-body-tertiary text-center">
                    <div className="mb-3" style={{ fontSize: 14 }}>
                      <span className="text-muted">Estimated total: </span>
                      <strong>{total}€</strong>
                    </div>

                    <Row className="g-2 justify-content-center">
                      <Col xs={12} sm={8} md={6}>
                        <div className="d-grid gap-2">
                          <Button type="submit">Continue to payment</Button>
                          <Button type="button" onClick={goDetails}>
                            View order details
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
