const navButtons = document.querySelectorAll(".card-nav button"),
  cardForms = document.querySelector(".card-form .forms"),
  activeBar = document.querySelector(".active-bar"),
  cardHeroInner = document.querySelector(".card-hero-inner");

const selectView = (view) => {
  for (let button of navButtons) {
    button.classList.remove("active");

    if (button.classList.contains(view)) {
      button.classList.add("active");
    }
  }

  if (view === "signin") {
    cardForms.style.top = "0";
    activeBar.style.top = "33.33%";
    cardHeroInner.style.top = "0";
  } else {
    cardForms.style.top = "-100%";
    activeBar.style.top = "66.66%";
    cardHeroInner.style.top = "-100%";
  }
};
