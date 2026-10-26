const page = document.querySelector(".page");
const sidebar = document.querySelector(".sidebar");
const collapseBtn = document.querySelector("#collapse-btn");
const themeBtn = document.querySelector("#theme-btn");

const setOpen = (open) => {
  sidebar.classList.toggle("open", open);
  collapseBtn.setAttribute("aria-expanded", open);
  collapseBtn.setAttribute("aria-label", open ? "Collapse sidebar" : "Expand sidebar");
};

collapseBtn.addEventListener("click", () =>
  setOpen(!sidebar.classList.contains("open")),
);

themeBtn.addEventListener("click", () => {
  const dark = page.classList.toggle("dark");

  themeBtn.setAttribute("aria-pressed", dark);
});

lucide.createIcons();
