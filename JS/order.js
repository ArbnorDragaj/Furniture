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

  function clearErrors() {
    [nameError, numberError, expiryError, cvvError, termsError].forEach(
      (e) => (e.textContent = "")
    );
    [cardNameInput, cardNumberInput, expiryInput, cvvInput].forEach((i) =>
      i.classList.remove("input-error")
    );
  }

  function setError(input, errorEl, message) {
    input.classList.add("input-error");
    errorEl.textContent = message;
  }

  cardNumberInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 16) v = v.slice(0, 16);
    e.target.value = v.replace(/(.{4})/g, "$1 ").trim();
  });

  cvvInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 3) v = v.slice(0, 3);
    e.target.value = v;
  });

  expiryInput.addEventListener("input", (e) => {
    let v = e.target.value.replace(/\D/g, "");
    if (v.length > 4) v = v.slice(0, 4);
    if (v.length >= 3) e.target.value = v.slice(0, 2) + "/" + v.slice(2);
    else e.target.value = v;
  });

  

  function validate() {
    clearErrors();
    let ok = true;

    if (!cardNameInput.value.trim()) {
      setError(cardNameInput, nameError, "Shkruani emrin.");
      ok = false;
    }

    const num = cardNumberInput.value.replace(/\s/g, "");
    if (num.length < 16) {
      setError(cardNumberInput, numberError, "Duhet 16 shifra.");
      ok = false;
    } 

    if (cvvInput.value.length !== 3) {
      setError(cvvInput, cvvError, "3 shifra.");
      ok = false;
    }

    const ex = expiryInput.value.split("/");
    if (ex.length !== 2) {
      setError(expiryInput, expiryError, "MM/YY");
      ok = false;
    } else {
      const m = +ex[0];
      const y = +ex[1];
      const now = new Date();
      const cy = now.getFullYear() % 100;
      const cm = now.getMonth() + 1;

      if (m < 1 || m > 12) {
        setError(expiryInput, expiryError, "Muaj i pavlefshëm.");
        ok = false;
      } else if (y < cy || (y === cy && m < cm)) {
        setError(expiryInput, expiryError, "Kartela ka skaduar.");
        ok = false;
      }
    }

    if (!termsCheckbox.checked) {
      termsError.textContent = "Duhet të pranoni kushtet.";
      ok = false;
    }

    return ok;
  }

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (typeof Swal !== "undefined") {
      Swal.fire({
        icon: "success",
        title: "Pagesa u krye me sukses!",
        text: "Faleminderit për porosinë 😊",
      });
    } else {
      alert("Pagesa u krye me sukses!");
    }

    form.reset();
  });
});


//pop up


document.addEventListener("DOMContentLoaded", () => {
  const termsLink = document.querySelector(".payment-check a");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("closePopup");

  if (!termsLink || !popup || !closePopup) return;

  
  termsLink.addEventListener("click", (e) => {
    e.preventDefault();
    popup.classList.add("show");
  });

  // me ket pjes mbyllet me iconen X
  closePopup.addEventListener("click", () => {
    popup.classList.remove("show");
  });

  // kjo pjes mundeson qe kur te klikojsh jasht popup box te mbyllet
  window.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.classList.remove("show");
    }
  });
});

const cardNameInput = document.getElementById("card-name");

cardNameInput.addEventListener("input", function () {
  let value = this.value
    .toLowerCase()
    .replace(/\b\w/g, char => char.toUpperCase());

  this.value = value;
});