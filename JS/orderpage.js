document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("orderForm");
  const STORAGE_KEY = "orderFormData";

  // Fushat
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

  /* ---------- Helper functions ---------- */

  function setError(fieldName, message) {
    const input = fields[fieldName];
    const errorEl = errors[fieldName];
    if (!input || !errorEl) return;
    input.classList.add("input-error");
    errorEl.textContent = message;
  }

  function clearError(fieldName) {
    const input = fields[fieldName];
    const errorEl = errors[fieldName];
    if (!input || !errorEl) return;
    input.classList.remove("input-error");
    errorEl.textContent = "";
  }

  function getFormData() {
    return {
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
    };
  }

  function saveFormData() {
    const data = getFormData();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }

  function restoreFormData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;
    try {
      const data = JSON.parse(saved);
      Object.keys(fields).forEach((key) => {
        if (data[key] !== undefined && data[key] !== null) {
          fields[key].value = data[key];
        }
      });
    } catch (err) {
      console.error("Gabim gjatë leximit nga localStorage", err);
    }
  }

  /* ---------- Restore data kur hapet faqja ---------- */
  restoreFormData();

  /* ---------- Pastrim errorav gjatë shkrimit + ruajtje ---------- */
  Object.keys(fields).forEach((key) => {
    const input = fields[key];

    input.addEventListener("input", () => {
      clearError(key);
      saveFormData();
    });

    if (input.tagName === "SELECT" || input.type === "date") {
      input.addEventListener("change", () => {
        clearError(key);
        saveFormData();
      });
    }
  });

  /* ---------- Validimi në submit ---------- */
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // pastron gabimet
    Object.keys(fields).forEach((key) => clearError(key));

    const data = getFormData();

    // Emri
    if (!data.fullName || data.fullName.trim().length < 3) {
      setError("fullName", "Shkruaj emrin dhe mbiemrin (min 3 karaktere).");
      isValid = false;
    }

    // Telefoni
    const phoneRegex = /^[0-9+\s]{7,20}$/;
    if (!phoneRegex.test(data.phone.trim())) {
      setError("phone", "Numri i telefonit është i pavlefshëm.");
      isValid = false;
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      setError("email", "Email-i nuk është valid.");
      isValid = false;
    }

    // Qyteti
    if (!data.city || data.city.trim().length < 2) {
      setError("city", "Shkruaj qytetin.");
      isValid = false;
    }

    // Adresa
    if (!data.address || data.address.trim().length < 5) {
      setError("address", "Shkruaj adresën e plotë.");
      isValid = false;
    }

    // Produkti
    if (!data.product) {
      setError("product", "Zgjedh produktin.");
      isValid = false;
    }

    // Sasia
    const quantityNum = parseInt(data.quantity, 10);
    if (isNaN(quantityNum) || quantityNum < 1) {
      setError("quantity", "Sasia duhet të jetë së paku 1.");
      isValid = false;
    }

    // Ngjyra
    if (!data.color) {
      setError("color", "Zgjedh ngjyrën.");
      isValid = false;
    }

    // Materiali
    if (!data.material) {
      setError("material", "Zgjedh materialin.");
      isValid = false;
    }

    // Data – jo në të kaluarën (opsionale)
    if (data.date) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const selected = new Date(data.date);

      if (selected < today) {
        setError("date", "Data e dorëzimit nuk mund të jetë në të kaluarën.");
        isValid = false;
      }
    }

    if (!isValid) {
      return;
    }

    saveFormData();

    // Redirect te faqja e pagesës
    window.location.href = "orderPayment.html";
  });
});
