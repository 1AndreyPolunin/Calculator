const display = document.querySelector("#display");
const buttons = document.querySelector("#buttons");

let expression = "";

function isOperator(symbol) {
    return (
        symbol === "+" ||
        symbol === "-" ||
        symbol === "*" ||
        symbol === "/"
    );
}

buttons.addEventListener("click", (event) => {

    if (event.target.tagName !== "BUTTON") {
        return;
    }

    let value = event.target.textContent;

    if (value === ",") {
        value = ".";
    }

    if (value === "AC") {

        expression = "";
        display.value = "";

    }

    else if (value === "DEL") {

        expression = expression.slice(0, -1);
        display.value = expression;

    }

    else if (value === "+/-") {

        if (expression !== "") {

            expression = "(-" + expression + ")";
            display.value = expression;

        }

    }

    else if (value === "%") {

        if (expression !== "") {

            expression = "(" + expression + "/100)";
            display.value = expression;

        }

    }

    else if (value === "=") {

        try {

            const result = Function(
                "return " + expression
            )();

            expression = result.toString();
            display.value = expression;

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

        display.value = expression;

    }

});