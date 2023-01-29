const operatorDisplay = document.querySelector(".operator-display");
const numberDisplay = document.querySelector(".number-display");
const allButtons = document.querySelectorAll(".button");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");
const audio = new Audio("calculator-press.wav");

let operand1, operand2, output;
let currentOperation = "none";
let displayNextOperand = false; // If the display should clear the current input displayed to display the next operand
let previousOperandCleared = false;
let setFirstOperand = true; // If the input should be stored in the operand1 variable
let setSecondOperand = false; // If the input should be stored in the operand2 variable
let firstOperandStored = false;
let secondOperandStored = false;

function displayDigit() {
  if (numberDisplay.textContent === "0") {
    numberDisplay.textContent = "";
    numberDisplay.textContent += this.id;
    // If the number display shows 0 only, remove 0 first before displaying another digit, this prevents one or multiple zeroes to appear before a 
    // non-zero digit
  } else {
    if (displayNextOperand) { // Removes the previous operand to display the next operand when an operator button is clicked
      console.log("operand cleared");
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
  output = operand1 = operand2 = undefined;
  currentOperation = "none";
  firstOperandStored = secondOperandStored = false;
  setFirstOperand = true;
  setSecondOperand = false;
  displayNextOperand = false;
  previousOperandCleared = false;
}

function backspace() {
  if (numberDisplay.textContent !== "0") {
    if (numberDisplay.textContent.charAt(1) === "") {
      numberDisplay.textContent = "0";
    } else {
      let numberDisplayContent = numberDisplay.textContent;
      numberDisplay.textContent = numberDisplayContent.slice(0, -1);
    }
    displayNextOperand = false;
    previousOperandCleared = true;
  }
  if (operatorDisplay.textContent === "=") {
    operatorDisplay.textContent = "";
  }
  console.log("displayNextOperand: " + displayNextOperand);
  console.log("previousOperandCleared: " + previousOperandCleared);
}

// Operation functions

function add() {
  let sum = operand1 + operand2;
  console.log("added");
  return sum;
}

function subtract() {
  let difference = operand1 - operand2;
  console.log("subtracted");
  return difference;
}

function multiply() {
  let product = operand1 * operand2;
  console.log("multiplied");
  return product;
}

function divide() {
  let quotient = operand1 / operand2;
  if (quotient === Infinity) {
    console.log("divided");
    return "undefined";
  }
  console.log("divided");
  return quotient;
}

function operate() {
  if (currentOperation === "addition") {
    output = add();
  } else if (currentOperation === "subtraction") {
    output = subtract();
  } else if (currentOperation === "multiplication") {
    output = multiply();
  } else if (currentOperation === "division") {
    output = divide();
  }
  console.log("operated");
}

function storeFirstOperand() {
  console.log("input stored to 1st operand");
  operand1 = +numberDisplay.textContent;
  displayNextOperand = true;
  setFirstOperand = false;
  setSecondOperand = true;
  firstOperandStored = true;
}

function storeSecondOperand() {
  console.log("input stored to 2nd operand");
  operand2 = +numberDisplay.textContent;
  setFirstOperand = true;
  setSecondOperand = false;
  secondOperandStored = true;
}

function displayOutput() {
  numberDisplay.textContent = output;
}

function reset() {
  console.log("all variables reset");
  output = operand1 = operand2 = undefined;
  currentOperation = "none";
  firstOperandStored = secondOperandStored = false;
  setFirstOperand = true;
  setSecondOperand = false;
  previousOperandCleared = false;
}

function playSound() {
  audio.currentTime = 0;
  audio.play();
}

function equalButtonClicked() {
  if (currentOperation !== "none") { // Prevents an operation from being done if an operator button has not yet been clicked
    if (previousOperandCleared === true) { // Prevents an operation from being done if there is no 2nd operand yet
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
  if (previousOperandCleared === false) {
    currentOperation = this.id;
    console.log("current operation changed to " + currentOperation);
    operatorDisplay.textContent = this.textContent;
  } 
  if (setSecondOperand) {
    if (previousOperandCleared === true) {
      storeSecondOperand();
      operate();
      displayOutput();
      reset();
      displayNextOperand = true;
      currentOperation = this.id;
      console.log("next operation changed to " + currentOperation);
      operatorDisplay.textContent = this.textContent;
    }
  }
  if (firstOperandStored === false) {
    storeFirstOperand();
  }
if (previousOperandCleared) {
  currentOperation = this.id;
  console.log("current operation changed to " + currentOperation);
  operatorDisplay.textContent = this.textContent;
}
}

function showVariableStatus() {
  console.log("operand1: " + operand1);
  console.log("operand2: " + operand2);
  console.log("output: " + output);
  console.log("displayNextOperand: " + displayNextOperand);
  console.log("previousOperandCleared: " + previousOperandCleared);
  console.log("setFirstOperand: " + setFirstOperand);
  console.log("setSecondOperand: " + setSecondOperand);
  console.log("firstOperandStored: " + firstOperandStored);
  console.log("secondOperandStored: " + secondOperandStored);
}

allButtons.forEach(button => {
  button.addEventListener('click', playSound);
})

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