const headerHTML = `
      <header class="navbar">
        <a href="index.html" class="navbar__logo">title</a>

        <nav class="navbar_links">
          <a href="index.html" class="nav-link">Home</a>
          <a href="about.html" class="nav-link">About</a>
          <a href="contact.html" class="nav-link">Contact</a>
          <a href="products.html" class="nav-link">Products</a>
          <a href="order.html" class="nav-link">Order now</a>
        </nav>
      </header>
`;

// 2. Insert the header into any element with id="site-header"
document.addEventListener("DOMContentLoaded", function () {
  const headerContainer = document.getElementById("navbar");
  if (headerContainer) {
    headerContainer.innerHTML = headerHTML;
  }
});
