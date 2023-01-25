const display = document.querySelector(".display");
const numberButtons = document.querySelectorAll(".number");
const decimalButton = document.querySelector("#decimal");
const clearButton = document.querySelector("#clear");
const backspaceButton = document.querySelector("#backspace");

function displayDigit() {
  display.textContent += this.id;
}

function addDecimal() {
  if (display.textContent.includes(".") === false) {
    display.textContent += ".";
  }
}

function clear() {
  display.textContent = "";
}

function backspace() {
  let displayContent = display.textContent;
  display.textContent = displayContent.slice(0, -1);
}

numberButtons.forEach(button => {
  button.addEventListener('click', displayDigit);
})

clearButton.addEventListener('click', clear);
backspaceButton.addEventListener('click', backspace);
decimalButton.addEventListener('click', addDecimal);