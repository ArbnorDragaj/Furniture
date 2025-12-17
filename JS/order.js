const input = document.getElementById("cvv");
const errorMsg = document.getElementById("errorMsg");
const form = document.getElementById("payment-form");

// Valido gjatë shkrimit
input.addEventListener("input", function (e) {
  const vlera = e.target.value;
  errorMsg.textContent = "";

  // Lejo vetëm numra
  const vetemNumra = vlera.replace(/[^0-9]/g, "");
  if (vetemNumra !== vlera) {
    e.target.value = vetemNumra;
  }

  // Nuk lejohen me shum se 3 numra
  if (vetemNumra.length > 3) {
    e.target.value = vetemNumra.slice(0, 3);
  }
});
// Validimi para dërgimit
form.addEventListener("submit", function (e) {
  const vlera = input.value;
  if (vlera.length !== 3 || !/^\d{3}$/.test(vlera)) {
    e.preventDefault();
    errorMsg.textContent = "Duhen saktësisht 3 numra!";
    input.focus();
  } else {
    alert("Forma u dërgua me sukses: " + vlera);
  }
});
