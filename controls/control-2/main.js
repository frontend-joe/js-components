const characters = [
  "Bowser",
  "Bowser Jr.",
  "Daisy",
  "Donkey Kong",
  "Dry Bones",
  "Iggy Koopa",
  "Inkling Boy",
  "Inkling Girl",
  "Isabelle",
  "King Boo",
  "Koopa Troopa",
  "Lakitu",
  "Larry Koopa",
  "Lemmy Koopa",
  "Link",
  "Ludwig von Koopa",
  "Luigi",
  "Mario",
  "Metal Mario",
  "Mii",
  "Peach",
  "Pink Gold Peach",
  "Rosalina",
  "Roy Koopa",
  "Shy Guy",
  "Toad",
  "Toadette",
  "Villager (Boy)",
  "Villager (Girl)",
  "Waluigi",
  "Wario",
  "Wendy O. Koopa",
  "Yoshi",
];
const dropdown = document.querySelector("#dropdown"),
  input = document.querySelector("#input"),
  menu = document.querySelector("#menu"),
  toggleButton = document.querySelector("#toggle-btn");

let currentFocusIndex = -1;
let menuItems = [];

const toggleMenu = (forceOpen = null) => {
  const nextOpen =
    forceOpen !== null ? forceOpen : !dropdown.classList.contains("open");
  dropdown.classList.toggle("open", nextOpen);

  if (nextOpen) {
    currentFocusIndex = -1;
    input.setAttribute("aria-expanded", "true");
  } else {
    input.setAttribute("aria-expanded", "false");
  }
};

const oninput = (e) => {
  const { value } = e.target;
  renderMenuItems(value);
  input.classList.toggle("has-value", value.length);
  currentFocusIndex = -1;

  if (!dropdown.classList.contains("open")) {
    toggleMenu(true);
  }
};

const onkeydown = (e) => {
  const isOpen = dropdown.classList.contains("open");

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      if (!isOpen) {
        toggleMenu(true);
      } else {
        currentFocusIndex = Math.min(
          currentFocusIndex + 1,
          menuItems.length - 1,
        );
        updateMenuFocus();
      }
      break;

    case "ArrowUp":
      e.preventDefault();
      if (isOpen) {
        currentFocusIndex = Math.max(currentFocusIndex - 1, -1);
        updateMenuFocus();
      }
      break;

    case "Enter":
      e.preventDefault();
      if (isOpen && currentFocusIndex >= 0) {
        selectItem(menuItems[currentFocusIndex]);
      }
      break;

    case "Escape":
      e.preventDefault();
      if (isOpen) {
        toggleMenu(false);
        input.focus();
      }
      break;

    case "Tab":
      if (isOpen) {
        toggleMenu(false);
      }
      break;
  }
};

const updateMenuFocus = () => {
  menuItems.forEach((item, index) => {
    if (index === currentFocusIndex) {
      item.classList.add("focused");
      item.setAttribute("aria-selected", "true");
    } else {
      item.classList.remove("focused");
      item.setAttribute("aria-selected", "false");
    }
  });
};

const selectItem = (button) => {
  input.value = button.textContent;
  input.classList.add("has-value");
  toggleMenu(false);
  input.focus();
};

const onMenuItemClick = (e) => {
  e.preventDefault();
  selectItem(e.target);
};

const renderMenuItems = (keyword) => {
  const filteredCharacters = characters.filter((c) =>
    !keyword.length ? true : c.toLowerCase().includes(keyword.toLowerCase()),
  );

  filteredCharacters.sort();

  let items = "";

  if (filteredCharacters.length) {
    for (let character of filteredCharacters) {
      items += `<button type="button" role="option" aria-selected="false" tabindex="-1">${character}</button>`;
    }
  } else {
    items = "<p role='status'>No characters found</p>";
  }

  menu.innerHTML = items;

  // Update menuItems array and add event listeners
  menuItems = Array.from(menu.querySelectorAll("button"));
  menuItems.forEach((button) => {
    button.addEventListener("click", onMenuItemClick);
    button.addEventListener("mouseenter", () => {
      currentFocusIndex = menuItems.indexOf(button);
      updateMenuFocus();
    });
  });
};

// Handle clicks outside the dropdown
const onDocumentClick = (e) => {
  if (!dropdown.contains(e.target)) {
    toggleMenu(false);
  }
};

renderMenuItems("");

// Set initial ARIA attributes
input.setAttribute("role", "combobox");
input.setAttribute("aria-expanded", "false");
input.setAttribute("aria-autocomplete", "list");
input.setAttribute("aria-haspopup", "listbox");
menu.setAttribute("role", "listbox");

input.addEventListener("focus", () => toggleMenu(true));
input.addEventListener("input", oninput);
input.addEventListener("keydown", onkeydown);
document.addEventListener("click", onDocumentClick);
