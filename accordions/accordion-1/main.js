const accordion = document.querySelector(".image-accordion");
const items = accordion.querySelectorAll(".image-accordion-item");

accordion.addEventListener("click", (e) => {
  const item = e.target.closest(".image-accordion-item");
  if (!item) return;
  items.forEach((el) => el.classList.toggle("active", el === item));
});
