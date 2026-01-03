import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Order from "./pages/Order";
import OrderDetails from "./pages/OrderDetails";
import OrderPayment from "./pages/OrderPayment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/order" />} />
          <Route path="/order" element={<Order />} />
          <Route path="/order-details" element={<OrderDetails />} />
          <Route path="/order-payment" element={<OrderPayment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
