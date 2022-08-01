export default class Calculator {
  constructor(
    primaryOperandDisplay,
    secondaryOperandDisplay,
    operationDisplay
  ) {
    this.#primaryOperandDisplay = primaryOperandDisplay
    this.#secondaryOperandDisplay = secondaryOperandDisplay
    this.#operationDisplay = operationDisplay

    this.allClear()
  }
  #primaryOperandDisplay
  #secondaryOperandDisplay
  #operationDisplay

  get primaryOperand() {
    return parseFloat(this.#primaryOperandDisplay.dataset.value)
  }

  set primaryOperand(value) {
    this.#primaryOperandDisplay.dataset.value = value ?? ""
    this.#primaryOperandDisplay.textContent = displayNumber(value)
  }

  get secondaryOperand() {
    return parseFloat(this.#secondaryOperandDisplay.dataset.value)
  }

  set secondaryOperand(value) {
    this.#secondaryOperandDisplay.dataset.value = value ?? ""
    this.#secondaryOperandDisplay.textContent = displayNumber(value)
  }

  get operation() {
    return this.#operationDisplay.textContent
  }

  set operation(value) {
    this.#operationDisplay.textContent = value ?? ""
  }

  addDigit(digit) {
    if (
      digit === "." &&
      this.#primaryOperandDisplay.dataset.value.includes(".")
    )
      return
    if (this.primaryOperand === 0) {
      this.primaryOperand = digit
      return
    }
    this.primaryOperand = this.#primaryOperandDisplay.dataset.value + digit
  }

  deleteDigit() {
    if (this.#primaryOperandDisplay.dataset.value.length <= 1) {
      this.primaryOperand = 0
      return
    }
    this.primaryOperand = this.#primaryOperandDisplay.dataset.value.slice(0, -1)
  }

  chooseOperation(operation) {
    if (this.secondaryOperand !== null) {
        this.evaluate()
    }
    this.operation = operation
    this.secondaryOperand = this.primaryOperand
    this.primaryOperand = 0
  }

  evaluate() {
    let result = null
    const firstNum = this.secondaryOperand
    const secondNum = this.primaryOperand
    const operator = this.operation

    switch (operator) {
      case "+":
        result = firstNum + secondNum
        break
      case "-":
        result = firstNum - secondNum
        break
      case "*":
        result = firstNum * secondNum
        break
      case "÷":
        result = firstNum / secondNum
        break
      default:
        return
    }

    this.allClear()
    this.primaryOperand = result
  }

  allClear() {
    this.primaryOperand = 0
    this.secondaryOperand = null
    this.operation = null
  }
}

const NUMBER_FORMATTER = new Intl.NumberFormat("en")

function displayNumber(number) {
  const stringNumber = number?.toString() || ""
  if (stringNumber === "") return ""
  const [integer, decimal] = stringNumber.split(".")
  const formattedInteger = NUMBER_FORMATTER.format(integer)
  if (decimal == null) return formattedInteger
  return formattedInteger + "." + decimal
}
