const sidebar = document.querySelector(".sidebar");
const collapseBtn = document.getElementById("collapseBtn");

collapseBtn.addEventListener("click", () => {
  const collapsed = sidebar.classList.toggle("collapsed");

  collapseBtn.setAttribute("aria-expanded", !collapsed);
  sidebar.classList.toggle("expanding", !collapsed);
});

sidebar.addEventListener("transitionend", (event) => {
  if (event.target === sidebar && event.propertyName === "width") {
    sidebar.classList.remove("expanding");
  }
});

document.querySelectorAll(".nav button").forEach((button) => {
  button.addEventListener("click", () => {
    document
      .querySelectorAll(".nav button")
      .forEach((b) => b.classList.remove("active"));

    button.classList.add("active");
  });
});

lucide.createIcons();
