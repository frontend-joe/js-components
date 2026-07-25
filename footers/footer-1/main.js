let isOpen = null;

const overlay = document.getElementById("modalOverlay");
const dialog = document.getElementById("modalDialog");
const openBtn = document.getElementById("openModalBtn");
const signupBtn = document.getElementById("signupBtn");
const modal = document.querySelector(".modal");

function toggleModal() {
  // Remove animation classes first
  overlay.classList.remove("open", "closed");
  modal.classList.remove("open", "closed");

  // Force reflow (this is the magic line)
  void overlay.offsetWidth;
  void modal.offsetWidth;

  if (!isOpen) {
    overlay.classList.add("open");
    modal.classList.add("open");
  } else {
    overlay.classList.add("closed");
    modal.classList.add("closed");
  }

  isOpen = !isOpen;
}

// Open modal button
openBtn.addEventListener("click", toggleModal);

// Signup button inside modal
signupBtn.addEventListener("click", toggleModal);

// Overlay click closes modal
overlay.addEventListener("click", toggleModal);

// Stop propagation so clicking modal doesn't close it
dialog.addEventListener("click", (e) => {
  e.stopPropagation();
});
