const strengthLabels = ["weak", "medium", "medium", "strong"];

const passwordInput = document.getElementById("passwordInput");
const bars = document.getElementById("bars");
const strengthText = document.getElementById("strengthText");

function getStrength(password) {
  let strengthIndicator = -1;

  if (/[a-z]/.test(password)) strengthIndicator++;
  if (/[A-Z]/.test(password)) strengthIndicator++;
  if (/\d/.test(password)) strengthIndicator++;
  if (/[^a-zA-Z0-9]/.test(password)) strengthIndicator++;

  if (password.length >= 16) strengthIndicator++;

  return strengthLabels[strengthIndicator] || "";
}

function handleChange(value) {
  const strength = getStrength(value);

  // update bars class
  bars.className = "bars " + strength;

  // update text
  strengthText.textContent = strength ? `${strength} password` : "";

  // this replaces React's onChange prop
  console.log(value);
}

passwordInput.addEventListener("input", (event) => {
  handleChange(event.target.value);
});
