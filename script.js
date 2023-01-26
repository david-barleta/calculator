const operatorDisplay = document.querySelector(".operator-display");
const numberDisplay = document.querySelector(".number-display");
const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const equalButton = document.querySelector("#equal");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");

let operand1, operand2, output;
let clearOperand = false;
let nextOperand = false;

function displayDigit() {
  if (numberDisplay.textContent === "0") {
    numberDisplay.textContent = "";
    numberDisplay.textContent += this.id;
  } else {
    numberDisplay.textContent += this.id;
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

numberButtons.forEach(button => {
  button.addEventListener('click', displayDigit);
})

clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', backspace);
decimalButton.addEventListener('click', addDecimal);