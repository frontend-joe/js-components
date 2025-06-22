const usernames = ["joseph", "joseph1", "joseph2"];

const input = document.querySelector("#input"),
  spinner = document.querySelector(".spinner"),
  button = document.querySelector("button");

const update = (value) => {
  spinner.classList.remove("visible");

  const usernameExists = usernames.some((u) => u === value);
  const invalid = usernameExists || !value;

  button.disabled = invalid;
  input.classList.toggle("valid", !invalid);
};

const debounce = (callback, time) => {
  let interval;
  return (...args) => {
    clearTimeout(interval);
    interval = setTimeout(() => {
      callback.apply(null, args);
    }, time);
  };
};

const handleStartTyping = () => {
  spinner.classList.add("visible");
};

const handleChange = debounce((input) => {
  const { value } = input.target;
  input.target.classList.toggle("has-value", value);
  update(value);
}, 500);
