import {
  format,
  addMonths,
  subMonths,
  getUnixTime,
  fromUnixTime,
  startOfWeek,
  startOfMonth,
  endOfWeek,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
} from "date-fns"

const datePickerButton = document.querySelector(".date-picker-button")
const datePicker = document.querySelector(".date-picker")
const datePickerHeaderText = document.querySelector(".current-month")
const prevMontBtn = document.querySelector(".prev-month-button")
const nextMontBtn = document.querySelector(".next-month-button")
const datePickerDates = document.querySelector(".date-picker-grid-dates")
let currentDate = new Date()

datePickerButton.addEventListener("click", (e) => {
  datePicker.classList.toggle("show")
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = selectedDate
  setupDatePicker(selectedDate)
})

function setDate(selectedDate) {
  datePickerButton.innerHTML = format(selectedDate, "MMMM do, yyyy")
  datePickerButton.dataset.selectedDate = getUnixTime(selectedDate)
}

function setupDatePicker(date) {
  datePickerHeaderText.innerHTML = format(currentDate, "MMMM - yyyy")
  setupDates(date)
}

function setupDates(selectedDate) {
  const firsDateWeek = startOfWeek(startOfMonth(currentDate))
  const lastDateWeek = endOfWeek(endOfMonth(currentDate))
  const dates = eachDayOfInterval({ start: firsDateWeek, end: lastDateWeek })
  datePickerDates.innerHTML = ""

  dates.forEach((date) => {
    const dateElement = document.createElement("button")
    dateElement.classList.add("date")
    dateElement.innerHTML = date.getDate()

    if (!isSameMonth(date, currentDate)) {
      dateElement.classList.add("date-picker-other-month-date")
    }
    if (isSameDay(date, selectedDate)) {
      dateElement.classList.add("selected")
    }

    dateElement.addEventListener("click", () => {
        setDate(date)
        datePicker.classList.remove('show')
    })

    datePickerDates.appendChild(dateElement)
  })
}

prevMontBtn.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = subMonths(currentDate, 1)
  setupDatePicker(selectedDate)
})

nextMontBtn.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerButton.dataset.selectedDate)
  currentDate = addMonths(currentDate, 1)
  setupDatePicker(selectedDate)
})

setDate(new Date())
