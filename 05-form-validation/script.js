// Select all elements needed
const form = document.querySelector("#form")
const usernameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")
const confirmationPasswordInput = document.querySelector(
  "#password-confirmation"
)
const termsInput = document.querySelector("#terms")
const errorSection = document.querySelector(".errors")
const errorList = errorSection.querySelector(".error-list")

// When submit the form
form.addEventListener("submit", (e) => {
  // create an empty error masseges array
  let errorList = []

  // Define some validation checks with error massages
  if (usernameInput.value.length < 6) {
    errorList.push("username must contain at least 6 letters")
  }
  if (passwordInput.value.length < 10) {
    errorList.push("password must contain at least 10 letters")
  }
  if (passwordInput.value !== confirmationPasswordInput.value) {
    errorList.push("make sure password and confrimation are match")
  }
  if (!termsInput.checked) {
    errorList.push("agree to our terms")
  }

  // Show errors if there is error
  if (errorList.length !== 0) {
    e.preventDefault()
    showErrors(errorList)
  }
})

function showErrors(errors) {
  errorSection.textContent = ""
  errorSection.classList.add("show")
  errors.forEach((err) => {
    const li = document.createElement("li")
    li.innerText = err
    errorSection.appendChild(li)
  })
}
