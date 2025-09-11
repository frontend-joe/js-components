const PLACEHOLDER_WORDS = [
  "purple themed modern admin dashboard",
  "intuitive habit and mood tracker",
  "interactive football quiz game",
  "portfolio website for a photographer",
];

const placeholder = document.querySelector("#placeholder"),
  placeholderText = document.querySelector("#placeholder-text"),
  textarea = document.querySelector("#textarea");

let placeholderWordIndex = 0;

placeholderText.innerHTML = PLACEHOLDER_WORDS[0];

let intervalId = setInterval(() => {
  placeholderWordIndex++;
  if (placeholderWordIndex > PLACEHOLDER_WORDS.length - 1) {
    placeholderWordIndex = 0;
  }
  placeholderText.innerHTML = PLACEHOLDER_WORDS[placeholderWordIndex];
}, 3000);

textarea.addEventListener(
  "input",
  (e) => (placeholder.style = `display: ${e.target.value ? "none" : "flex"}`)
);
