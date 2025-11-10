const time = document.getElementById('time');
const calc = document.getElementById("calculations");
const result = document.getElementById("result");
const dropdown = document.querySelector(".dropdown__history article p");
const dropdownIcon = document.getElementById('ddown');
const aside = document.querySelector(".dropdown__history aside");
const historyLog = document.getElementById("historyLog");
const history = document.querySelector(".history");


// To get the time
function currentTime() {
    const current = new Date();
    const style = {
      hour: "2-digit",
      minute: "2-digit",
    };

    time.textContent = current.toLocaleTimeString([], style);
    time.dateTime = current.toISOString();
}

setInterval(currentTime, 1000);

currentTime();


function appendToResult(input) {
    calc.textContent += input;
}

function clearResult() {
    calc.textContent = "";
    result.textContent = "";
}

function removeInput() {
    calc.textContent = calc.textContent.slice(0, -1);
}

function calculateResult() {
    let expression = calc.textContent;
    expression = expression.replace(/(\d+)%/g, "($1/100)");
    try {
      const value = eval(expression);
      historyLog.innerHTML += `<div>${expression} = ${value}</div>`;
      result.textContent = value;
    } catch (e) {
      result.textContent = "Error";
    }
}

history.addEventListener("click", (e) => {
    e.preventDefault();
    e.stopPropagation();

  historyLog.classList.toggle("view");
})


function changeSign(input) {
     if (calc.textContent) {
       let current = parseFloat(calc.textContent);
       if (!isNaN(current)) {
         calc.textContent = current * -1;
       }
     }
}

// switching dropdown for dropup and opening aside display onclick

dropdown.addEventListener("click", (e) => {
  e.preventDefault();
  e.stopPropagation();

  aside.classList.toggle("open");

  dropdownIcon.src = aside.classList.contains("open")
    ? "images/drop-up.png"
    : "images/down-arrow.png";
});

// Closing drop down no matter where it is clicked
document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target) && aside.classList.contains("open")) {
    aside.classList.remove("open");
    dropdownIcon.src = "images/down-arrow.png";
  }
});