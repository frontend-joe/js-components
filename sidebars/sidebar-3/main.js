const subMenus = document.querySelectorAll(".sub-menu");
const btns = document.querySelectorAll("button");

const reset = () => {
  btns.forEach((btn) => btn.classList.remove("active"));
  subMenus.forEach((menu) => (menu.style.height = 0));
};

const openSubmenu = (element) => {
  reset();
  element.classList.add("active");
  const sibling = element.nextElementSibling;
  const ul = sibling.querySelector("ul");

  if (sibling.clientHeight === 0) {
    sibling.style.height = `${ul.clientHeight}px`;
  } else {
    sibling.style.height = 0;
    element.classList.remove("active");
  }
};

const gotoPage = (element) => {
  reset();
  element.classList.add("active");
};
