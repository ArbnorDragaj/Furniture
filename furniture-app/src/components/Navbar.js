import { Navbar as BsNavbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <BsNavbar bg="dark" className="py-3">
      <Container>
        <BsNavbar.Brand as={Link} to="/order">
          <img
            src="./logo.png"
            alt=""
            style={{
              height: "90px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        </BsNavbar.Brand>
      </Container>
    </BsNavbar>
  );
}
