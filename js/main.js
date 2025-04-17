const buttons = document.querySelectorAll("button");

const screenDisplay = document.getElementById("screen-display");
screenDisplay.textContent = "";

const numContainer = [];
const opContainer = [];

let numLeft = "";
let numRight = "";
let display = "";

let result = 0;

buttons.forEach((button) => {
  button.addEventListener("click", function () {
    const value = button.textContent;

    if (value === "CLEAR") {
      screenDisplay.textContent = "";
      numLeft = "";
      numRight = "";
      opContainer.length = 0;
      return;
    }

    if (isNaN(value) && value !== ".") {
        console.log("Op: " + opContainer[0]);
      if ((opContainer.length === 1 && numRight !== "") || value === '=') {
        result = calculate(opContainer[0]);

        if(value !== "="){
            opContainer.length = 0;
            opContainer.push(value);
        }else{
            opContainer.length = 0;
        }
        
        numLeft = result;
        numRight = "";
        

      }else if(opContainer.length === 1 && numRight === ""){
        opContainer.length = 0;
        opContainer.push(value);
      }else{
        opContainer.push(value);
      }

    } else {
      if (opContainer.length === 1) {
        numRight += value;
      } else {
        numLeft += value;
      }
    }

    display = numLeft + " " + (opContainer.length === 1 ? opContainer[0] : " ") + " " + numRight;
    screenDisplay.textContent = display;
  });

  document.addEventListener("keyup", function (event) {
    console.log("key Pressed: " + event.key);
  });
});

function calculate(operator) {
  if (operator === "+") {
    result = Number(numLeft) + Number(numRight);
  } else if (operator === "-") {
    result = Number(numLeft) - Number(numRight);
  } else if (operator === "x") {
    result = Number(numLeft) * Number(numRight);
  } else if (operator === "/") {
    result = Number(numLeft) / Number(numRight);
  } else{
    if (numRight !== "") {
      return calculate(opContainer[0]);
    }
  }
  return result;
}
