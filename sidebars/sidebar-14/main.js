const sidebar = document.querySelector(".sidebar");
const collapseBtn = document.getElementById("collapseBtn");
const themeToggle = document.getElementById("themeToggle");
const themeSwitch = themeToggle.querySelector(".switch");

collapseBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

const nav = document.querySelector(".nav");
const navButtons = [...nav.querySelectorAll("button")];

// CSS multiplies this by --row (54px) to place the sliding indicator
const setActive = (button) => {
  navButtons.forEach((b) => b.classList.remove("active"));
  button.classList.add("active");
  nav.style.setProperty("--active-row", navButtons.indexOf(button));
};

navButtons.forEach((button) => {
  button.addEventListener("click", () => setActive(button));
});

setActive(nav.querySelector("button.active") ?? navButtons[0]);

themeToggle.addEventListener("click", () => {
  const on = themeSwitch.classList.toggle("on");
  themeToggle.setAttribute("aria-pressed", on);
  document.body.classList.toggle("dark", on);
});

lucide.createIcons();
