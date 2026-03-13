const sidebar = document.getElementById("sidebar");
const burger = document.getElementById("burger");
const icon = document.getElementById("burgerIcon");

let isOpen = false;

burger.addEventListener("click", () => {
  isOpen = !isOpen;

  sidebar.classList.toggle("open");

  icon.textContent = isOpen ? "close" : "menu";
});
