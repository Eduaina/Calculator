const time = document.getElementById("time");
const calc = document.getElementById("calculations");
const result = document.getElementById("result");
const dropdown = document.querySelector(".dropdown__history article p");
const dropdownIcon = document.getElementById("ddown");
const aside = document.querySelector(".dropdown__history aside");
const historyLog = document.getElementById("historyLog");
const history = document.querySelector(".history");


// Time Display 
function currentTime() {
  const current = new Date();
  const style = { hour: "2-digit", minute: "2-digit" };
  time.textContent = current.toLocaleTimeString([], style);
  time.dateTime = current.toISOString();
}
setInterval(currentTime, 1000);
currentTime();




let currentValue = "";
let previousValue = "";
let operator = null;

// Append number input
function appendNumber(num) {
  currentValue += num;
  calc.textContent = currentValue;
}

// Choose operator
function chooseOperator(op) {
  if (currentValue === "") return;
  if (previousValue !== "") compute();
  operator = op;
  previousValue = currentValue;
  currentValue = "";
}

// Compute result
function compute() {
  const prev = parseFloat(previousValue);
  const curr = parseFloat(currentValue);
  if (isNaN(prev) || isNaN(curr)) return;

  let computation;

  switch (operator) {
    case "+":
      computation = add(prev, curr);
      break;
    case "-":
      computation = subtract(prev, curr);
      break;
    case "*":
      computation = multiply(prev, curr);
      break;
    case "/":
      computation = divide(prev, curr);
      break;
    case "%":
      computation = percent(prev, curr);
      break;
    default:
      return;
  }

  result.textContent = computation;
  historyLog.innerHTML += `<div>${previousValue} ${operator} ${currentValue} = ${computation}</div>`;
  currentValue = computation.toString();
  operator = null;
  previousValue = "";
}



function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  let total = 0;
  const positive = Math.abs(b);
  for (let i = 0; i < positive; i++) total += a;
  return b < 0 ? -total : total;
}

function divide(a, b) {
  if (b === 0) return "Error";
  return a / b;
}

function percent(a, b) {
  return (a * b) / 100;
}




function clearResult() {
  currentValue = "";
  previousValue = "";
  operator = null;
  calc.textContent = "";
  result.textContent = "";
}



function removeInput() {
  currentValue = currentValue.slice(0, -1);
  calc.textContent = currentValue;
}



function changeSign() {
  if (currentValue) {
    currentValue = (parseFloat(currentValue) * -1).toString();
    calc.textContent = currentValue;
  }
}


//History Toggle
history.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  historyLog.classList.toggle("view");
});



// Dropdown Toggle
dropdown.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();
  aside.classList.toggle("open");
  dropdownIcon.src = aside.classList.contains("open")
    ? "images/drop-up.png"
    : "images/down-arrow.png";
});



// Close dropdown when clicking elsewhere
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && aside.classList.contains("open")) {
    aside.classList.remove("open");
    dropdownIcon.src = "images/down-arrow.png";
  }
});
