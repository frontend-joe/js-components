const sidebar = document.querySelector(".sidebar");
const handle = document.querySelector(".handle");

let isResizing = false;

const MIN_WIDTH = 56;
const MAX_WIDTH = 240;

handle.addEventListener("mousedown", (e) => {
  isResizing = true;
  document.body.classList.add("resizing");
  e.preventDefault();
});

document.addEventListener("mousemove", (e) => {
  if (!isResizing) return;

  const sidebarRect = sidebar.getBoundingClientRect();
  let newWidth = e.clientX - sidebarRect.left;
  if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
  if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;

  sidebar.style.width = newWidth + "px";
});

document.addEventListener("mouseup", () => {
  if (!isResizing) return;

  isResizing = false;
  document.body.classList.remove("resizing");
});

handle.addEventListener("dblclick", () => {
  const currentWidth = sidebar.getBoundingClientRect().width;
  sidebar.classList.add("is-toggling");
  sidebar.style.width = (currentWidth <= MIN_WIDTH ? MAX_WIDTH : MIN_WIDTH) + "px";
  sidebar.addEventListener("transitionend", () => sidebar.classList.remove("is-toggling"), { once: true });
});
