const display = document.querySelector("#display");
const buttons = document.querySelector(".calculator");
const extraButtons = document.querySelector("#extra-buttons");

let expression = "";

function isOperator(symbol) {
    return (
        symbol === "+" ||
        symbol === "-" ||
        symbol === "*" ||
        symbol === "/"
    );
}

function updateDisplay() {

    display.value = expression;

    display.scrollLeft = display.scrollWidth;

    if (display.value.length > 20) {
        display.style.fontSize = "30px";
    }

    else if (display.value.length > 10) {
        display.style.fontSize = "40px";
    }

    else {
        display.style.fontSize = "60px";
    }

}

buttons.addEventListener("click", (event) => {

    if (event.target.tagName !== "BUTTON") {
        return;
    }

    let value = event.target.textContent;
    console.log("[" + value + "]");
    if (value === ",") {
        value = ".";
    }

    if (value === "AC") {

        expression = "";
        updateDisplay();

    }

    else if (value === "DEL") {

        expression = expression.slice(0, -1);
        updateDisplay();

    }

    else if (value === "+/-") {

        if (expression !== "") {

            expression = "(-" + expression + ")";
            updateDisplay();

        }

    }

    else if (value === "%") {

        if (expression !== "") {

            expression = "(" + expression + "/100)";
            updateDisplay();

        }

    }

    else if (value === "MORE") {

        if (extraButtons.classList.contains("hidden")) {
            extraButtons.classList.remove("hidden");
        } else {
            extraButtons.classList.add("hidden");
        }

    }

    else if (value === "RAND") {

        const randomNumber =
            "0." +
            Math.floor(Math.random() * 100000)
                .toString()
                .padStart(5, "0");

        expression += randomNumber;
        updateDisplay();

    }

    else if (value === "π") {

        expression += Math.PI;
        updateDisplay();

    }

    else if (value === "MR") {

        expression += "*0";
        updateDisplay();

    }

    else if (value === "x²") {

        if (expression !== "") {

            try {

                const current =
                    Function("return " + expression)();

                expression =
                    (current ** 2).toString();

                updateDisplay();

            }

            catch {

                display.value = "Ошибка";
                expression = "";

            }

        }

    }

    else if (value === "x³") {

        if (expression !== "") {

            try {

                const current =
                    Function("return " + expression)();

                expression =
                    (current ** 3).toString();

                updateDisplay();

            }

            catch {

                display.value = "Ошибка";
                expression = "";

            }

        }

    }

    else if (value === "=") {

        try {

            const result =
                Function("return " + expression)();

            expression = result.toString();

            updateDisplay();

        }

        catch {

            display.value = "Ошибка";
            expression = "";

        }

    }

    else {

        const lastSymbol = expression[expression.length - 1];

        if (
            isOperator(value) &&
            isOperator(lastSymbol)
        ) {

            expression =
                expression.slice(0, -1) + value;

        }

        else {

            expression += value;

        }

        updateDisplay();

    }

});