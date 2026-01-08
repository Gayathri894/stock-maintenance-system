// Block if not logged in
if (!localStorage.getItem("loggedIn")) {
  window.location.href = "index.html";
}

const role = localStorage.getItem("currentRole");

// ===== ADD PRODUCT (ADMIN ONLY) =====
function addProduct() {
  if (role !== "admin") {
    alert("Access denied");
    return;
  }

  const name = document.getElementById("name").value;
  const category = document.getElementById("category").value;
  const price = document.getElementById("price").value;
  const quantity = document.getElementById("quantity").value;

  let products = JSON.parse(localStorage.getItem("products")) || [];

  products.push({ name, category, price, quantity });
  localStorage.setItem("products", JSON.stringify(products));

  alert("Product added successfully");
}

// ===== LOAD PRODUCTS (ADMIN + STAFF) =====
function loadProducts() {
  let products = JSON.parse(localStorage.getItem("products")) || [];
  const table = document.getElementById("productTable");

  if (!table) return;

  table.innerHTML = "";

  products.forEach((p, index) => {
    let actionBtn = "";

    // Admin can delete, staff cannot
    if (role === "admin") {
      actionBtn = `<button onclick="deleteProduct(${index})">Delete</button>`;
    }

    table.innerHTML += `
      <tr>
        <td>${p.name}</td>
        <td>${p.category}</td>
        <td>${p.price}</td>
        <td>${p.quantity}</td>
        <td class="${p.quantity < 10 ? 'low' : ''}">
          ${p.quantity < 10 ? 'Low Stock' : 'Available'}
        </td>
        <td>${actionBtn}</td>
      </tr>
    `;
  });
}

// ===== DELETE PRODUCT (ADMIN ONLY) =====
function deleteProduct(index) {
  if (role !== "admin") return;

  let products = JSON.parse(localStorage.getItem("products"));
  products.splice(index, 1);
  localStorage.setItem("products", JSON.stringify(products));
  loadProducts();
}

// Load product list automatically
loadProducts();
