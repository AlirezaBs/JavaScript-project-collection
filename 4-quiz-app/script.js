const form = document.querySelector("#quiz-form")
const answerInputs = document.querySelectorAll(".answer")
const questions = Array.from(document.querySelectorAll(".question-item"))
const alert = document.querySelector("#alert")
const overlay = document.querySelector("#overlay")

form.addEventListener("submit", (e) => {
  e.preventDefault()

  // Add incorrect class to all questions to make sure incurrect answers shows as incorrect
 questions.forEach((q) => {
    q.classList.add("incorrect")
    q.classList.remove('correct')
  })

  // Get all selected answers
  const selected = Array.from(answerInputs).filter((answer) => answer.checked)

  /* See if selected answers are correct then add the classes for correct
  and incorrect answers */
  selected.forEach((item) => {
    if (item.value === "true") {
      const parentQuestion = item.closest(".question-item")
      parentQuestion.classList.remove("incorrect")
      parentQuestion.classList.add("correct")
    } else {
      const parentQuestion = item.closest(".question-item")
      parentQuestion.classList.remove("correct")
    }
  })

  // alert when all answers was currect and if all selected
  const AllCorrect = selected.every((item) => item.value === "true")
  const allSelected = selected.length === questions.length
  if (AllCorrect && allSelected) {
    alert.classList.add("active")
    overlay.classList.add("active")
    setTimeout(() => {
      alert.classList.remove("active")
      overlay.classList.remove("active")
    }, 3000)
  }

  // clear 'correct' & 'incorrect' classes after alert gone 
  // and clear selected items
  setTimeout(() => {
    questions.forEach((ques) => {
      ques.classList.remove("correct")
      ques.classList.remove("incorrect")
    })
    selected.forEach(item => {
      item.checked = false
    })
  }, 3000)
})
