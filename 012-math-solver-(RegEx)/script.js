const form = document.querySelector("#form")
const input = document.querySelector("[data-input]")
const output = document.querySelector("#output")

// 7 + 5 * 2 - 4
const PARENTHESIS_REGEX = /\(\s*(?<equation>[^\(\)]*)\s*\)/
const EXPONENT_REGEX =
  /(?<operand1>\-?\w+)\s*(?<operation>\^)\s*(?<operand2>\-?\w+)/
const MULTIPLY_DIVISION_REGEX =
  /(?<operand1>\-?\w+)\s*(?<operation>[\*\/])\s*(?<operand2>\-?\w+)/
const ADD_SUBTRACT_REGEX =
  /(?<operand1>\-?\w+)\s*(?<operation>[\+\-])\s*(?<operand2>\-?\w+)/

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const result = parse(input.value)
  output.textContent = result
})

function parse(equation) {
  console.log(equation)
  if (equation.match(PARENTHESIS_REGEX)) {
    const resault = parse(equation.match(PARENTHESIS_REGEX).groups.equation)
    const newEquation = equation.replace(PARENTHESIS_REGEX, resault)
    return parse(newEquation)
  } else if (equation.match(EXPONENT_REGEX)) {
    const result = handleMath(equation.match(EXPONENT_REGEX).groups)
    const newEquation = equation.replace(EXPONENT_REGEX, result)
    return parse(newEquation)
  } else if (equation.match(MULTIPLY_DIVISION_REGEX)) {
    const result = handleMath(equation.match(MULTIPLY_DIVISION_REGEX).groups)
    const newEquation = equation.replace(MULTIPLY_DIVISION_REGEX, result)
    return parse(newEquation)
  } else if (equation.match(ADD_SUBTRACT_REGEX)) {
    const result = handleMath(equation.match(ADD_SUBTRACT_REGEX).groups)
    const newEquation = equation.replace(ADD_SUBTRACT_REGEX, result)
    return parse(newEquation)
  } else {
    return equation
  }
}

function handleMath({ operand1, operation, operand2 }) {
  const num1 = parseFloat(operand1)
  const num2 = parseFloat(operand2)

  switch (operation) {
    case "^":
      return num1 ** num2
    case "*":
      return num1 * num2
    case "/":
      return num1 / num2
    case "+":
      return num1 + num2
    case "-":
      return num1 - num2
  }
}
