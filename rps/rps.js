const compContainer = document.querySelector("#comp-container");
let compSymbol = document.querySelector("#comp-container>span");
const commentry = document.querySelector("body p:nth-child(1)");

const playerSymbols = document.querySelectorAll(".player-symbol");

let pScore = 0;
let cScore = 0;

playerSymbols.forEach((symbol) => {
    symbol.addEventListener("click", () => {
        symbol.classList.add("fa-bounce");
        main(symbol.getAttribute("data-choice"));
    });

    symbol.addEventListener("animationend", () => {
        symbol.classList.remove("fa-bounce");
    });
});

function refreshCompSymbol(choice_symbol) {
    compContainer.removeChild(document.querySelector(".comp-symbol"));
    let compSymbol = document.createElement("div");
    compSymbol.classList.add(
        "comp-symbol",
        "fa-solid",
        "fa-bounce",
        `${choice_symbol}`
    );
    compContainer.appendChild(compSymbol);
}

function main(pChoice) {
    let cChoice = Math.floor(Math.random() * 3);

    switch (cChoice) {
        case 0:
            refreshCompSymbol("fa-hand-back-fist");
            break;
        case 1:
            refreshCompSymbol("fa-hand");
            break;
        case 2:
            refreshCompSymbol("fa-hand-scissors");
    }

    if (pChoice == cChoice) {
    } else if ((cChoice + 1) % 3 == pChoice) {
        pScore++;
    } else {
        cScore++;
    }
    commentry.textContent = `${pScore}:${cScore}`;
    if (pScore >= 3 || cScore >= 3) {
        if (pScore > cScore) commentry.textContent = "Player Won!";
        else commentry.textContent = "Computer Won";
        pScore = 0;
        cScore = 0;
    }
}
