const loginForm = document.querySelector(".login");
const registerForm = document.querySelector(".register");
const toggle = document.querySelector(".toggle");

const toggleView = (next) => {
  toggle.classList.toggle("login-active", next === "login");

  // Reset forms
  [(loginForm, registerForm)].forEach((element) =>
    element.classList.remove("active"),
  );

  // Toggle active class
  loginForm.classList.toggle("active", next === "login");
  registerForm.classList.toggle("active", next === "register");
};
