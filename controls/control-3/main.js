const input = document.querySelector("#input"),
  icon = document.querySelector("#icon"),
  button = document.querySelector("#button");

let showPassword = false;

const handleMouseDown = (e) => {
  console.log("mouseDown");
  e.preventDefault();

  showPassword = !showPassword;

  if (showPassword) {
    input.type = "text";
    icon.innerHTML = "visibility_off";
  } else {
    input.type = "password";
    icon.innerHTML = "visibility";
  }
};

const handleInput = (e) => {
  if (e.target.value) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
};
