const signinForm = document.querySelector(".form.signin");
const signupForm = document.querySelector(".form.signup");
const cardBg1 = document.querySelector(".card-bg-1");
const cardBg2 = document.querySelector(".card-bg-2");

const toggleView = () => {
  const signinActive = signinForm.classList.contains("active");

  signinForm.classList.toggle("active", !signinActive);
  signupForm.classList.toggle("active", signinActive);

  [cardBg1, cardBg2].forEach((el) =>
    el.classList.toggle("signin", signinActive)
  );
  [cardBg1, cardBg2].forEach((el) =>
    el.classList.toggle("signup", !signinActive)
  );
};
