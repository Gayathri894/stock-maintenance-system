// Block access if not logged in
if (!localStorage.getItem("loggedIn")) {
  window.location.href = "index.html";
}

const role = localStorage.getItem("currentRole");

// Get elements
const roleTitle = document.getElementById("roleTitle");
const adminActions = document.getElementById("adminActions");
const staffActions = document.getElementById("staffActions");

// Role-based dashboard view
if (role === "admin") {
  roleTitle.innerText = "Admin Dashboard";
  adminActions.style.display = "flex";
  staffActions.style.display = "none";
} else if (role === "staff") {
  roleTitle.innerText = "Staff Dashboard";
  adminActions.style.display = "none";
  staffActions.style.display = "flex";
} else {
  window.location.href = "index.html";
}

// Logout
function logout() {
  localStorage.clear();
  window.location.href = "index.html";
}
