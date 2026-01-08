function signup() {
  const username = document.getElementById("newUsername").value.trim();
  const password = document.getElementById("newPassword").value.trim();
  const role = document.getElementById("role").value;

  if (!username || !password || !role) {
    alert("All fields required");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some(u => u.username === username)) {
    alert("Username already exists");
    return;
  }

  users.push({ username, password, role });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created");
  window.location.href = "index.html";
}

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    document.getElementById("error").innerText = "Invalid credentials";
    return;
  }

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("currentRole", user.role);
  window.location.href = "dashboard.html";
}
