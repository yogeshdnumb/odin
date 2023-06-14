const buttons = document.querySelectorAll("#buttons>*");
const screen = document.querySelector("#screen > span");

const operators = "+-*/%=";

click_sound = new Audio("./audio/keypress.mp3");
enter_sound = new Audio("./audio/enter.mp3");

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "Enter":
            main("=");
            break;
        case "Backspace":
            main("C");
            break;
        case "Escape":
            main("AC");
    }

    if (operators.includes(e.key) || !isNaN(e.key)) {
        main(e.key);
    }
});

buttons.forEach((element) => {
    element.addEventListener("click", (event) => {
        main(event.target.textContent);
    });
});

function main(value) {
    if (value === "=") {
        enter_sound.currentTime = 0;
        enter_sound.play();
    } else {
        click_sound.currentTime = 0;
        click_sound.play();
    }

    if (screen.textContent === "NaN" || screen.textContent === "Infinity") {
        screen.textContent = "";
    }

    if (value === "AC") {
        screen.textContent = "";
        return;
    }
    if (value === "C") {
        screen.textContent = screen.textContent.slice(0, -1);
        return;
    }
    if (value === ".") {
        if (screen.textContent.includes(".")) {
            return;
        }
    }
    if (operators.includes(value)) {
        if (
            operators.includes(
                screen.textContent.charAt(screen.textContent.length - 1)
            )
        ) {
            if (value != "=") {
                screen.textContent = screen.textContent.slice(0, -1) + value;
            }
            return;
        } else {
            operate(
                screen.textContent.match(
                    /([.\d]+(?:e\+\d+)?)([+\-*\/%])?(\d+)?/
                )
            );

            if (value === "=") {
                return;
            }
        }
    }

    screen.textContent += value;
}

function operate(matches) {
    if (matches[3] !== undefined) {
        var x = Number(matches[1]);
        var y = Number(matches[3]);
        var op = matches[2];

        switch (op) {
            case "+":
                screen.textContent = +x + +y;
                break;
            case "-":
                screen.textContent = x - y;
                break;
            case "*":
                screen.textContent = x * y;
                break;
            case "/":
                screen.textContent = x / y;
                break;
            case "%":
                screen.textContent = x % y;
                break;
        }
    }
}
