const display = document.querySelector(".display");
const buttons = Array.from(document.querySelectorAll(".buttons .button"));

function calculate(expr) {
  try {
    return Function(`"use strict"; return (${expr})`)();
  } catch {
    return "Error!";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", (e) => {
    const value = e.target.innerText;

    switch (value) {
      case "AC":
        display.innerText = "0";
        break;
      case "=":
        display.innerText = calculate(display.innerText);
        break;
      case "+/-":
        if (display.innerText !== "0") {
          if (display.innerText.startsWith("-")) {
            display.innerText = display.innerText.slice(1);
          } else {
            display.innerText = "-" + display.innerText;
          }
        }
        break;
      case "%":
        display.innerText = calculate(display.innerText + "/100");
        break;
      default:
        // Не позволяем вводить несколько точек подряд
        if (value === "." && display.innerText.slice(-1) === ".") return;

        if (display.innerText === "0" && value !== ".") {
          display.innerText = value;
        } else {
          display.innerText += value;
        }
    }
  });
});
