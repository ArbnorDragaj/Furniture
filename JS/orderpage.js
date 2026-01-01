document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");

  const fields = {
    fullName: document.getElementById("fullName"),
    phone: document.getElementById("phone"),
    email: document.getElementById("email"),
    city: document.getElementById("city"),
    address: document.getElementById("address"),
    product: document.getElementById("product"),
    quantity: document.getElementById("quantity"),
    color: document.getElementById("color"),
    material: document.getElementById("material"),
    date: document.getElementById("date"),
    notes: document.getElementById("notes"),
  };

  const errors = {
    fullName: document.getElementById("fullName-error"),
    phone: document.getElementById("phone-error"),
    email: document.getElementById("email-error"),
    city: document.getElementById("city-error"),
    address: document.getElementById("address-error"),
    product: document.getElementById("product-error"),
    quantity: document.getElementById("quantity-error"),
    color: document.getElementById("color-error"),
    material: document.getElementById("material-error"),
    date: document.getElementById("date-error"),
    notes: document.getElementById("notes-error"),
  };

  const totalEl = document.getElementById("orderTotal");

  function resetErrors() {
    Object.values(errors).forEach((el) => el && (el.textContent = ""));
    Object.values(fields).forEach((input) =>
      input && input.classList.remove("input-error")
    );
  }

  function setError(field, message) {
    fields[field].classList.add("input-error");
    errors[field].textContent = message;
  }

  function updateTotal() {
    const option = fields.product.options[fields.product.selectedIndex];
    const price = Number(option?.dataset?.price || 0);
    let qty = Number(fields.quantity.value || 1);

    if (qty < 1) qty = 1;
    const total = price * qty;
    totalEl.textContent = total > 0 ? `${total}€` : "0€";
  }

  function validate() {
    resetErrors();
    let valid = true;

    if (!fields.fullName.value.trim()) {
      setError("fullName", "Shkruani emrin.");
      valid = false;
    }

    const phoneRegex = /^\+383\s?\d{2}\s?\d{3}\s?\d{3}$/;
    if (!phoneRegex.test(fields.phone.value.trim())) {
      setError("phone", "Formati: +383 44 123 456");
      valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(fields.email.value.trim())) {
      setError("email", "Email i pavlefshëm.");
      valid = false;
    }

    if (!fields.city.value.trim()) {
      setError("city", "Shkruani qytetin.");
      valid = false;
    }

    if (!fields.address.value.trim()) {
      setError("address", "Shkruani adresën.");
      valid = false;
    }

    if (!fields.product.value) {
      setError("product", "Zgjidh produktin.");
      valid = false;
    }

    if (fields.quantity.value < 1) {
      setError("quantity", "Sasia min 1.");
      valid = false;
    }

    return valid;
  }

  fields.product.addEventListener("change", updateTotal);
  fields.quantity.addEventListener("input", updateTotal);
  updateTotal();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      fullName: fields.fullName.value,
      phone: fields.phone.value,
      email: fields.email.value,
      city: fields.city.value,
      address: fields.address.value,
      product: fields.product.value,
      quantity: fields.quantity.value,
      color: fields.color.value,
      material: fields.material.value,
      date: fields.date.value,
      notes: fields.notes.value,
      total: totalEl.textContent,
    };

    localStorage.setItem("orderData", JSON.stringify(data));
    window.location.href = "orderPayment.html";

  });
  const detailsBtn = document.getElementById("detailsBtn");

if (detailsBtn) {
  detailsBtn.addEventListener("click", () => {
    if (!validate()) return;

    const data = {
      fullName: fields.fullName.value,
      phone: fields.phone.value,
      email: fields.email.value,
      city: fields.city.value,
      address: fields.address.value,
      product: fields.product.value,
      quantity: fields.quantity.value,
      color: fields.color.value,
      material: fields.material.value,
      date: fields.date.value,
      notes: fields.notes.value,
      total: totalEl.textContent || "0€",
    };

    localStorage.setItem("orderData", JSON.stringify(data));
    window.location.href = "orderDetails.html";
  });
}
});


