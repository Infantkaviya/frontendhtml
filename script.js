const calculator = document.getElementById("calculator");

// Create display
const display = document.createElement("input");
display.className = "form-control mb-3 text-end fs-4";
display.id = "display";
display.disabled = true;
calculator.appendChild(display);

// Button labels
const buttons = [
  ["7", "8", "9", "/"],
  ["4", "5", "6", "*"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
  ["C", "M+", "M-", "MC"]
];

// Create buttons dynamically using Bootstrap layout
buttons.forEach(rowValues => {
  const row = document.createElement("div");
  row.className = "d-flex justify-content-between mb-2";
  rowValues.forEach(value => {
    const button = document.createElement("button");
    button.textContent = value;
    button.className = "btn btn-outline-primary flex-fill mx-1";
    button.addEventListener("click", () => handleInput(value));
    row.appendChild(button);
  });
  calculator.appendChild(row);
});

let memory = parseFloat(localStorage.getItem("memory")) || 0;

function handleInput(value) {
  if (value === "=") {
    try {
      display.value = eval(display.value);
    } catch {
      display.value = "Error";
    }
  } else if (value === "C") {
    display.value = "";
  } else if (value === "M+") {
    memory += parseFloat(display.value) || 0;
    localStorage.setItem("memory", memory);
  } else if (value === "M-") {
    memory -= parseFloat(display.value) || 0;
    localStorage.setItem("memory", memory);
  } else if (value === "MC") {
    memory = 0;
    localStorage.removeItem("memory");
  } else {
    display.value += value;
  }
}

// Keyboard input
document.addEventListener("keydown", (e) => {
  const allowed = /[0-9+\-*/.=]/;
  if (allowed.test(e.key)) {
    handleInput(e.key === "Enter" ? "=" : e.key);
  } else if (e.key === "Backspace") {
    display.value = display.value.slice(0, -1);
  } else {
    alert("Only numbers are allowed");
  }
});
