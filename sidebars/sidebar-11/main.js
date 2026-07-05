const sidebar = document.querySelector(".sidebar");
const collapseBtn = document.getElementById("collapseBtn");
const themeSwitch = document.getElementById("themeSwitch");
const searchInput = document.querySelector(".search input");

collapseBtn.addEventListener("click", () => {
  sidebar.classList.toggle("collapsed");
});

document.querySelectorAll(".nav button").forEach((button) => {
  button.addEventListener("click", () => {
    const list = button.closest(".nav");
    list
      .querySelectorAll("button")
      .forEach((b) => b.classList.remove("active"));
    button.classList.add("active");
  });
});

themeSwitch.addEventListener("click", () => {
  themeSwitch.classList.toggle("on");
  document.body.classList.toggle("dark", !themeSwitch.classList.contains("on"));
});

lucide.createIcons();
