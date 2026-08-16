const sidebar = document.querySelector(".sidebar");
const collapseBtn = document.getElementById("collapseBtn");
const themeToggle = document.getElementById("themeToggle");
const themeSwitch = themeToggle.querySelector(".switch");

collapseBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

document.querySelectorAll(".nav button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".nav button")
      .forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
  });
});

themeToggle.addEventListener("click", () => {
  const on = themeSwitch.classList.toggle("on");
  themeToggle.setAttribute("aria-pressed", on);
  document.body.classList.toggle("dark", on);
});

lucide.createIcons();
