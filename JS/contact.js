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
