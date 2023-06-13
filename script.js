const display = document.querySelector(".calculator-input");
const keys = document.querySelector(".calculator-keys");

let displayValue = "0";
let firstValue = null;
let operator = null;
let waitingForSecondValue = false;

updateDisplay();
function updateDisplay() {
  display.value = displayValue;
}

keys.addEventListener("click", function (event) {
  const element = event.target;
  const value = element.value;
  if (!element.matches("button")) return; // tıkladığımız elementin button olup olmadığını kontrol etme
  //return demek burdan sonraki kodları işletilmemesi demek

  switch (value) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      handleOperator(value);
      break;
    case ",":
      inputDecimal();
      break;
    case "clear":
      inputClear(value);
      break;
    default:
      inputNumber(value);
  }
  updateDisplay();
});

function handleOperator(nextoperator) {
  const value = parseFloat(displayValue);

  if (firstValue === null) {
    firstValue = value;
  } else if (operator) {
    const result = calculate(firstValue, value, operator);
    displayValue = `${parseFloat(result.toFixed(7))}`; // virgülden sonra maksimum basamak sayısı
    firstValue = result;
  }

  waitingForSecondValue = true;
  operator = nextoperator;
}
function calculate(first, second, operator) {
  if (operator == "+") {
    return first + second;
  } else if (operator == "-") {
    return first - second;
  } else if (operator == "*") {
    return first * second;
  } else if (operator == "/") {
    return first / second;
  }
  return second;
}
function inputNumber(number) {
  if (waitingForSecondValue) {
    displayValue = number;
    waitingForSecondValue = false;
  } else {
    displayValue = displayValue === "0" ? number : displayValue + number; // 0 a eğer eşitse number bilgisini aktar / değilse  display sonunda numberi aktar
  }
}

function inputDecimal() {
  if (!displayValue.includes(",")) {
    displayValue += ",";
  }
}

function inputClear() {
  displayValue = "0";
}
