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
  clearButton = document.querySelector("#clear-btn");

let currentFocusIndex = -1;
let menuItems = [];

const hasValue = () => input.value.length > 0;

const toggleMenu = (forceOpen = null, { browse = false } = {}) => {
  const nextOpen =
    forceOpen !== null ? forceOpen : !dropdown.classList.contains("open");

  // Guarded here rather than at each call site, so focus and typing obey the
  // same rule: nothing opens until something has been searched for. `browse`
  // is the deliberate exception — ArrowDown asks for the list outright.
  const open = nextOpen && (browse || hasValue());

  dropdown.classList.toggle("open", open);

  if (open) {
    currentFocusIndex = -1;
    input.setAttribute("aria-expanded", "true");
  } else {
    input.setAttribute("aria-expanded", "false");
  }
};

const oninput = (e) => {
  const { value } = e.target;
  input.classList.toggle("has-value", value.length);
  currentFocusIndex = -1;

  // Only refill the list while there is something to filter by. Clearing the
  // field is already closing the menu, and repopulating it with the unfiltered
  // set flashes every item through the fade-out.
  if (value.length) renderMenuItems(value);

  // opens as soon as there is a value, and closes again if it is cleared
  toggleMenu(hasValue());
};

const onkeydown = (e) => {
  const isOpen = dropdown.classList.contains("open");

  switch (e.key) {
    case "ArrowDown":
      e.preventDefault();
      if (!isOpen) {
        // rebuild from the current value, which may be empty — browsing the
        // whole list is the point, and a stale filter would be wrong here
        renderMenuItems(input.value);
        toggleMenu(true, { browse: true });
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

  // Focus first: refocusing the input fires the focus handler, which would
  // reopen the menu now that there is a value. Closing after wins.
  input.focus();
  toggleMenu(false);
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

// Set initial ARIA attributes
input.setAttribute("role", "combobox");
input.setAttribute("aria-expanded", "false");
input.setAttribute("aria-autocomplete", "list");
input.setAttribute("aria-haspopup", "listbox");
menu.setAttribute("role", "listbox");

clearButton.addEventListener("click", () => {
  input.value = "";
  // reuse the input path so filtering, .has-value and the menu all follow
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.focus();
});

input.addEventListener("focus", () => toggleMenu(true));
input.addEventListener("input", oninput);
input.addEventListener("keydown", onkeydown);
document.addEventListener("click", onDocumentClick);

lucide.createIcons();
