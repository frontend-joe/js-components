const nav = document.querySelector("nav"),
  submenu = document.querySelector(".submenu"),
  submenus = document.querySelectorAll(".submenu > div");

const onMenuHover = (element) => {
  submenus.forEach((s) => s.classList.remove("visible"));

  const selectedSubmenu = document.querySelector(
    `.submenu-${element.innerText.toLowerCase()}`
  );

  selectedSubmenu.classList.add("visible");

  let liRect = element.getBoundingClientRect();
  let navRect = nav.getBoundingClientRect();

  submenu.style.translate = `${liRect.x - navRect.x}px 0`;
};
