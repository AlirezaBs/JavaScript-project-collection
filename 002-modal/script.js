// Select all elements
const openBtn = document.querySelector("#open-modal-btn")
const overlay = document.querySelector("#overlay")
const modal = document.querySelector("#modal")
const closeBtn = document.querySelector("#close-modal-btn")

// Create a click event listener for the open-modal-btn that
// adds the class 'open' to the modal and overlay
openBtn.addEventListener("click", () => {
  modal.classList.add("open")
  overlay.classList.add("open")
})

// Create a click event listener for the close-modal-btn that
// removes the class 'open' from the modal and overlay
closeBtn.addEventListener("click", () => {
  modal.classList.remove("open")
  overlay.classList.remove("open")
})

// add a click event listener to the overlay that removes the
// class 'open' from the modal and overlay
overlay.addEventListener("click", () => {
  modal.classList.remove("open")
  overlay.classList.remove("open")
})
