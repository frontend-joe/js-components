const dropdown = document.getElementById("dropdown");
const trigger = document.getElementById("trigger");
const track = document.getElementById("pages");
const core = dropdown.querySelector(".menu");

const pages = new Map([...track.children].map((page) => [page.dataset.page, page]));

const settleMs = (el) =>
  Math.max(
    ...getComputedStyle(el)
      .transitionDuration.split(",")
      .map((d) => parseFloat(d) * 1000)
  );

let settleTimer;

const goTo = (name) => {
  track.dataset.at = name;
  core.style.setProperty("--h", `${pages.get(name).offsetHeight}px`);

  track.classList.add("in-flight");
  clearTimeout(settleTimer);
  settleTimer = setTimeout(
    () => track.classList.remove("in-flight"),
    settleMs(pages.get(name))
  );

  pages.forEach((page, key) => {
    const current = key === name;

    page.classList.toggle("is-active", current);
    page.setAttribute("aria-hidden", !current);
    page.querySelectorAll("button").forEach((b) => (b.tabIndex = current ? 0 : -1));
  });
};

const setOpen = (open) => {
  dropdown.classList.toggle("open", open);
  trigger.setAttribute("aria-expanded", open);

  if (!open) setTimeout(() => goTo("root"), 480);
};

trigger.addEventListener("click", () => setOpen(!dropdown.classList.contains("open")));

track.addEventListener("click", (event) => {
  const drill = event.target.closest("[data-open]");
  const back = event.target.closest("[data-back]");

  if (drill) goTo(drill.dataset.open);
  else if (back) goTo("root");
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("#dropdown")) setOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape" || !dropdown.classList.contains("open")) return;

  setOpen(false);
  trigger.focus();
});

addEventListener("resize", () => goTo(track.dataset.at), { passive: true });

goTo("root");
