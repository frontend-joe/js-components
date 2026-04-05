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

  // Calculate width relative to sidebar's left edge
  let newWidth = e.clientX - sidebarRect.left;

  // Clamp width
  if (newWidth < MIN_WIDTH) newWidth = MIN_WIDTH;
  if (newWidth > MAX_WIDTH) newWidth = MAX_WIDTH;

  sidebar.style.width = newWidth + "px";
});

document.addEventListener("mouseup", () => {
  if (!isResizing) return;

  isResizing = false;
  document.body.classList.remove("resizing");
});
