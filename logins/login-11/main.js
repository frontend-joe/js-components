const card = document.querySelector(".card");

document.querySelectorAll(".switch-btn").forEach((button) => {
  button.addEventListener("click", () => {
    // The wipe is only armed once the user has actually switched, so it does
    // not play itself across the card on first paint.
    card.classList.add("has-toggled");
    card.classList.toggle("register");
  });
});

document.querySelectorAll(".reveal").forEach((button) => {
  button.addEventListener("click", () => {
    const input = button.previousElementSibling;
    const shown = button.classList.toggle("on");

    input.type = shown ? "text" : "password";
    button.querySelector("span").textContent = shown
      ? "visibility_off"
      : "visibility";
    button.setAttribute("aria-label", shown ? "Hide password" : "Show password");
  });
});
