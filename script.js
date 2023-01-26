const operatorDisplay = document.querySelector(".operator-display");
const numberDisplay = document.querySelector(".number-display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");

let operand1, operand2, operation, output;
let nextOperand = false;

function displayDigit() {
  if (numberDisplay.textContent === "0") {
    numberDisplay.textContent = "";
    numberDisplay.textContent += this.id;
  } else {
    if (nextOperand) {
      numberDisplay.textContent = "";
      numberDisplay.textContent += this.id;
      nextOperand = false;
    } else {
      numberDisplay.textContent += this.id;
    }
  }
}

function addDecimal() {
  if (numberDisplay.textContent.includes(".") === false) {
    numberDisplay.textContent += ".";
  }
}

function clear() {
  numberDisplay.textContent = "0";
  operatorDisplay.textContent = "";
  output = operand1 = operand2 = 0;
  operation = "none";
  nextOperand = false;
}

function backspace() {
  if (numberDisplay.textContent !== "0") {
    if (numberDisplay.textContent.charAt(1) === "") {
      numberDisplay.textContent = "0";
    } else {
      let numberDisplayContent = numberDisplay.textContent;
      numberDisplay.textContent = numberDisplayContent.slice(0, -1);
    }
    
  }
}

function setOperation() {
  operation = this.id;
  operatorDisplay.textContent = this.textContent;
  operand1 = +numberDisplay.textContent;
  nextOperand = true;
}

function add(addend1, addend2) {
  let sum = addend1 + addend2;
  console.log("addition");
  return sum;
}

function subtract(minuend, subtrahend) {
  let difference = minuend - subtrahend;
  return difference;
}

function multiply(multiplicand, multiplier) {
  let product = multiplicand * multiplier;
  return product;
}

function divide(dividend, divisor) {
  let quotient = dividend / divisor;
  return quotient;
}

function operate() {
  operand2 = +numberDisplay.textContent;
  if (operation === "addition") {
    output = add(operand1, operand2);
  } else if (operation === "subtraction") {
    output = subtract(operand1, operand2);
  } else if (operation === "multiplication") {
    output = multiply(operand1, operand2);
  } else if (operation === "division") {
    output = divide(operand1, operand2);
  }
  operatorDisplay.textContent = "=";
  numberDisplay.textContent = output;
  output = operand1 = operand2 = 0;
  operation = "none";  
}

numberButtons.forEach(button => {
  button.addEventListener('click', displayDigit);
})

operatorButtons.forEach(button => {
  button.addEventListener('click', setOperation);
})

equalButton.addEventListener('click', operate);
clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', backspace);
decimalButton.addEventListener('click', addDecimal);