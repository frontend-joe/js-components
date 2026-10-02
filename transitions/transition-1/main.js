const root = document.documentElement;
const bubbles = document.querySelector(".bubbles");
const second = document.querySelector(".bubbles__second");

let leavingTo = null;


document.querySelectorAll("nav a").forEach((link) => {
  link.addEventListener("click", (event) => {
    if (link.hasAttribute("aria-current")) return;

    // The cover has to fill the screen before the browser is allowed to leave.
    event.preventDefault();

    if (leavingTo) return;

    leavingTo = link.href;
    second.dataset.target = link.dataset.theme;
    bubbles.classList.add("covering");
  });
});

// Both phases are ended by the CSS that draws them rather than by a timer, so
// the durations only ever live in one place.
second.addEventListener("animationend", (event) => {
  if (event.animationName === "bubble-second-move") {
    // Tell the next document to come up covered. Set only once the navigation
    // is actually happening, so a stale flag can never cover an unrelated load.
    try {
      sessionStorage.setItem("entering", "1");
    } catch {}

    location.href = leavingTo;
  }
  if (event.animationName === "hold") root.classList.remove("entering");
});

// Coming back through history lands on a covered page with no transition to
// release it, so lift the cover on restore.
addEventListener("pageshow", (event) => {
  if (event.persisted) {
    leavingTo = null;
    bubbles.classList.remove("covering");
  }
});
