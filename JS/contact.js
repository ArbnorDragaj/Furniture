document.getElementById("sendBtn").addEventListener("click", function () {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const message = document.getElementById("message").value.trim();

  if (name === "" || email === "" || phone === "" || message === "") {
    Swal.fire({
      icon: "error",
      title: "Gabim!",
      text: "Ju lutem plotësoni të gjitha fushat ❌",
      confirmButtonText: "OK",
    });
  } else {
    Swal.fire({
      icon: "success",
      title: "Faleminderit!",
      text: "Mesazhi juaj u dërgua me sukses ✅",
      confirmButtonText: "Mbyll",
    });

    // pas suksesit i zbraz fushat
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("message").value = "";
  }


});
// validimi i fushave contact page//
document.getElementById("sendBtn").addEventListener("click", function () {

  const email = document.getElementById("email");
  const phone = document.getElementById("phone");
  const message = document.getElementById("message");

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Fshij error mesazhet e vjetra
  document.querySelectorAll(".error-msg").forEach(el => el.remove());

  let hasError = false;

  function showError(input, msg) {
    const error = document.createElement("small");
    error.className = "error-msg";
    error.textContent = msg;
    input.after(error);
    hasError = true;
  }

  // Email
  if (email.value.trim() === "") {
    showError(email, "Email is required");
  } else if (!emailRegex.test(email.value.trim())) {
    showError(email, "Email format is not valid");
  }

  // Phone
  if (phone.value.trim() === "") {
    showError(phone, "Phone number is required");
  } else if (phone.value.trim().length < 8) {
    showError(phone, "Phone number is too short");
  }

  // Message
  if (message.value.trim() === "") {
    showError(message, "Message field cannot be empty");
  }

  // Nese ka gabime ndalo gjithcka
  if (hasError) return;

  // Vetem ketu lejohet suksesi
  Swal.fire({
    icon: "success",
    title: "Faleminiderit!",
    text: "Mesazhi juaj u dergua me sukses",
  });

  document.getElementById("name").value = "";
  email.value = "";
  phone.value = "";
  message.value = "";
});
