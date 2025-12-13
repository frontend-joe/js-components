const signinHero = document.querySelector(".hero.signin");
const signinForm = document.querySelector(".form.signin");
const signupHero = document.querySelector(".hero.signup");
const signupForm = document.querySelector(".form.signup");
const cardBg = document.querySelector(".card-bg");

const toggleView = () => {
  const signinActive = signinHero.classList.contains("active");

  cardBg.classList.toggle("signin", !signinActive);

  [signinHero, signinForm].forEach((el) => el.classList.toggle("active"));
  [signupHero, signupForm].forEach((el) => el.classList.toggle("active"));
};
