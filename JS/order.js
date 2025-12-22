document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("payment-form");

  const cardNameInput = document.getElementById("card-name");
  const cardNumberInput = document.getElementById("card-number");
  const expiryInput = document.getElementById("expiry");
  const cvvInput = document.getElementById("cvv");
  const termsCheckbox = document.getElementById("terms");

  const nameError = document.getElementById("card-name-error");
  const numberError = document.getElementById("card-number-error");
  const expiryError = document.getElementById("expiry-error");
  const cvvError = document.getElementById("cvv-error");
  const termsError = document.getElementById("terms-error");

  /* ================= CVV  ================= */
  cvvInput.addEventListener("input", (e) => {
    let value = e.target.value;

    // lejo vetëm numra
    value = value.replace(/[^0-9]/g, "");

    // max 3 shifra
    if (value.length > 3) value = value.slice(0, 3);

    e.target.value = value;
    cvvError.textContent = "";
  });

  /* ================= FORM VALIDATION ================= */
  form.addEventListener("submit", (e) => {
    let isValid = true;

    // pastro gabimet
    [cardNameInput, cardNumberInput, expiryInput, cvvInput].forEach((el) =>
      el.classList.remove("input-error")
    );

    [nameError, numberError, expiryError, cvvError, termsError].forEach(
      (el) => (el.textContent = "")
    );

    /* -------- 1. Emri në kartelë -------- */
    const nameValue = cardNameInput.value.trim();
    if (nameValue.length < 3) {
      nameError.textContent = "Shkruaj emrin e plotë në kartelë.";
      cardNameInput.classList.add("input-error");
      isValid = false;
    }

    /* -------- 2. Numri i kartelës -------- */
    const rawNumber = cardNumberInput.value.replace(/\s+/g, "");
    if (!/^\d{16}$/.test(rawNumber)) {
      numberError.textContent = "Numri i kartelës duhet të ketë 16 shifra.";
      cardNumberInput.classList.add("input-error");
      isValid = false;
    }

    /* -------- 3. Data e skadimit -------- */
    const expiry = expiryInput.value.trim();
    const match = expiry.match(/^(\d{2})\/(\d{2})$/);

    if (!match) {
      expiryError.textContent = "Shkruaj datën si MM/YY.";
      expiryInput.classList.add("input-error");
      isValid = false;
    } else {
      const month = parseInt(match[1], 10);
      const year = parseInt("20" + match[2], 10);

      if (month < 1 || month > 12) {
        expiryError.textContent = "Muaji duhet të jetë mes 01 dhe 12.";
        expiryInput.classList.add("input-error");
        isValid = false;
      } else {
        const now = new Date();
        const endOfMonth = new Date(year, month, 0);

        if (endOfMonth < now) {
          expiryError.textContent = "Kjo kartelë ka skaduar.";
          expiryInput.classList.add("input-error");
          isValid = false;
        }
      }
    }

    /* -------- 4. CVV -------- */
    const cvvValue = cvvInput.value.trim();
    if (!/^\d{3}$/.test(cvvValue)) {
      cvvError.textContent = "CVV duhet të ketë saktësisht 3 numra.";
      cvvInput.classList.add("input-error");
      isValid = false;
    }

    /* -------- 5. Terms Checkbox -------- */
    if (!termsCheckbox.checked) {
      termsError.textContent = "Duhet të pranosh Kushtet dhe Rregullat.";
      isValid = false;
    }

    /* -------- STOP SUBMIT IF ERRORS -------- */
    if (!isValid) {
      e.preventDefault();
    } else {
      alert("Të dhënat janë në rregull ✔️");
    }
  });
});

const cvvInput = document.getElementById("cvv");

cvvInput.addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^0-9]/g, "").slice(0, 3);
});

/*  Numri i karteles */

const cardInput = document.getElementById("card-number");

cardInput.addEventListener("input", function () {
  // 1. Largon te gjithe karakteret që nuk janë numra

  let value = this.value.replace(/\D/g, "");

  //  lejon maksimumi 16 shifra

  value = value.substring(0, 16);

  // 2. Ndan ne grupe me nga 4 shifra
  const parts = value.match(/.{1,4}/g);

  // 3. vendos hapsirat mes grupeve
  this.value = parts ? parts.join(" ") : "";
});

/*  Emri ne kartele*/

const input = document.getElementById("card-name");

input.addEventListener("input", function () {
  if (!this.value) return;
  this.value = this.value.charAt(0).toUpperCase() + this.value.slice(1);
});
