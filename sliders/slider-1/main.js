const sliderBar = document.querySelector("#slider-bar"),
  sliderInput = document.querySelector("#slider-input"),
  numericInput = document.querySelector("#numeric-input"),
  markers = document.querySelectorAll("#markers .marker");

const getBarWidth = (numValue) => {
  const THUMB_SIZE = 20;
  const percentageOfThumb = (THUMB_SIZE * numValue) / 100;
  return `${numValue - percentageOfThumb / 2}%`;
};

const oninput = (e) => {
  const inputValue = e.target.value;

  if (inputValue === "") {
    sliderBar.style = `width: 0%`;
    return;
  }

  const numValue = Number(inputValue);
  if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
    sliderBar.style = `width: ${getBarWidth(+inputValue)}`;
  }

  markers.forEach((marker, i) => {
    marker.classList.toggle("active", i === 0 || numValue >= i * 25);
  });

  sliderInput.value = inputValue;
  numericInput.value = inputValue;
};

sliderInput.addEventListener("input", oninput);
numericInput.addEventListener("input", oninput);
