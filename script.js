const operatorDisplay = document.querySelector(".operator-display");
const numberDisplay = document.querySelector(".number-display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");

let operand1, operand2, output;
let operation = "none";
let displayNextOperand = false; // If the display should clear the current input displayed to display the next operand
let previousOperandCleared = false;
let firstOperand = true; // If the input should be stored in the operand1 variable
let secondOperand = false; // If the input should be stored in the operand2 variable
let firstOperandStored = false;
let secondOperandStored = false;



function displayDigit() {
  if (numberDisplay.textContent === "0") {
    numberDisplay.textContent = "";
    numberDisplay.textContent += this.id;
  } else {
    if (displayNextOperand) {
      numberDisplay.textContent = "";
      numberDisplay.textContent += this.id;
      displayNextOperand = false;
      previousOperandCleared = true;
      if (operatorDisplay.textContent === "=") {
        operatorDisplay.textContent = "";
      }
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
  displayNextOperand = false;
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

// Operation functions

function add() {
  let sum = operand1 + operand2;
  return sum;
}

function subtract() {
  let difference = operand1 - operand2;
  return difference;
}

function multiply() {
  let product = operand1 * operand2;
  return product;
}

function divide() {
  let quotient = operand1 / operand2;
  if (quotient === Infinity) {
    return "undefined";
  }
  return quotient;
}

function operate() {
  if (operation === "addition") {
    output = add();
  } else if (operation === "subtraction") {
    output = subtract();
  } else if (operation === "multiplication") {
    output = multiply();
  } else if (operation === "division") {
    output = divide();
  }
}

function storeFirstOperand() {
  operand1 = +numberDisplay.textContent;
  displayNextOperand = true;
  firstOperand = false;
  secondOperand = true;
  firstOperandStored = true;
}

function storeSecondOperand() {
  operand2 = +numberDisplay.textContent;
  firstOperand = true;
  secondOperand = false;
  secondOperandStored = true;
}

function displayOutput() {
  numberDisplay.textContent = output;
}

function reset() {
  output = operand1 = operand2 = undefined;
  operation = "none";
  firstOperandStored = secondOperandStored = false;
  previousOperandCleared = false;
}

function equalButtonClicked() {
  if (operation !== "none") {
    if (previousOperandCleared === true) {
      operatorDisplay.textContent = "=";
      storeSecondOperand();
      operate();
      displayOutput();
      reset();
      displayNextOperand = true;
    }
  }
}

function operatorButtonClicked() {
  operation = this.id;
  operatorDisplay.textContent = this.textContent;
  storeFirstOperand();
}

numberButtons.forEach(button => {
  button.addEventListener('click', displayDigit);
})

operatorButtons.forEach(button => {
  button.addEventListener('click', operatorButtonClicked);
})

equalButton.addEventListener('click', equalButtonClicked);
clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', backspace);
decimalButton.addEventListener('click', addDecimal);