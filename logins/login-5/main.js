const loginHero = document.querySelector(".hero.login");
const loginForm = document.querySelector(".form.login");
const registerHero = document.querySelector(".hero.register");
const registerForm = document.querySelector(".form.register");
const cardBg = document.querySelector(".card-bg");

const toggleView = () => {
  const loginActive = loginHero.classList.contains("active");

  cardBg.classList.toggle("login", !loginActive);

  [loginHero, loginForm].forEach((el) => el.classList.toggle("active"));
  [registerHero, registerForm].forEach((el) => el.classList.toggle("active"));
};
