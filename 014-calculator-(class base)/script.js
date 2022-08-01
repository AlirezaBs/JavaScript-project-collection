// ACTIONS (WalkThrow)
//  1. Clicking a number
//  2. Click clear button
//  3. Click delete button
//  4. Click oa operations
//  5. Click the period button
//  6. Click equals
import Calculator from "./Calculatior.js"

const primaryOperandDisplay = document.querySelector("[data-primary-operand]")
const secondaryOperandDisplay = document.querySelector("[data-secondary-operand]")
const operationDisplay = document.querySelector("[data-operation]")

const calculator = new Calculator(primaryOperandDisplay, secondaryOperandDisplay, operationDisplay)

document.addEventListener("click", (e) => {
    if (e.target.matches("[data-all-clear]")) {
        calculator.allClear()
    }
    if (e.target.matches("[data-number]")) {
      calculator.addDigit(e.target.textContent)
    }
  if (e.target.matches("[data-delete]")) {
    calculator.deleteDigit()
  }
  if (e.target.matches("[data-operation")) {
    calculator.chooseOperation(e.target.textContent)
  }
  if (e.target.matches("[data-equals")) {
    calculator.evaluate()
  }
})
