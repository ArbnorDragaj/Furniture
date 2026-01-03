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
      
      notes: fields.notes.value,
      total: totalEl.textContent || "0€",
    };

    localStorage.setItem("orderData", JSON.stringify(data));
    window.location.href = "orderDetails.html";
  });
}
});


document.addEventListener("DOMContentLoaded", () => {
  const phoneInput = document.getElementById("phone");
  if (!phoneInput) return;

  const PREFIX = "+383 ";

  function formatPhone(value) {
    // hiq gjithcka pervec numrave
    let digits = value.replace(/\D/g, "");

    // nese user ka shkru 383 ne fillim, hiqe (sepse prefix e japim ne tekst)
    if (digits.startsWith("383")) digits = digits.slice(3);

    // merr max 8 shifra (44 + 189 + 111 = 2 + 3 + 3)
    digits = digits.slice(0, 8);

    const p1 = digits.slice(0, 2);
    const p2 = digits.slice(2, 5);
    const p3 = digits.slice(5, 8);

    let out = PREFIX;
    if (p1) out += p1;
    if (p2) out += " " + p2;
    if (p3) out += " " + p3;

    return out;
  }

  // vendos prefix ne fillim
  if (!phoneInput.value) phoneInput.value = PREFIX;

  phoneInput.addEventListener("focus", () => {
    if (!phoneInput.value) phoneInput.value = PREFIX;
    if (!phoneInput.value.startsWith(PREFIX)) phoneInput.value = PREFIX;
  });

  phoneInput.addEventListener("input", () => {
    const pos = phoneInput.selectionStart || 0;
    const beforeLen = phoneInput.value.length;

    phoneInput.value = formatPhone(phoneInput.value);

    // mos lejo kursorin me hy para prefix
    const afterLen = phoneInput.value.length;
    const diff = afterLen - beforeLen;
    const newPos = Math.max(PREFIX.length, pos + diff);
    phoneInput.setSelectionRange(newPos, newPos);
  });

  phoneInput.addEventListener("keydown", (e) => {
    // mos lejo me fshi prefix
    if (
      (e.key === "Backspace" || e.key === "Delete") &&
      (phoneInput.selectionStart || 0) <= PREFIX.length
    ) {
      e.preventDefault();
      phoneInput.value = PREFIX;
      phoneInput.setSelectionRange(PREFIX.length, PREFIX.length);
    }
  });

  // opsionale: ne submit kontrollo a eshte komplet
  phoneInput.addEventListener("blur", () => {
    // nese nuk i ka 8 shifra pas prefix, e le si eshte (ti mundesh me qit error)
    const digits = phoneInput.value.replace(/\D/g, "");
    // digits perfshin edhe 383, prandaj presim 11 gjithsej (383 + 8)
    if (digits.length === 0) phoneInput.value = "";
    else if (!phoneInput.value.startsWith(PREFIX)) phoneInput.value = formatPhone(phoneInput.value);
  });
});
