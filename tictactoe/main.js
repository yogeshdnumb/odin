const cat = document.querySelector(".players #cat");
const dog = document.querySelector(".players #dog");
const modal = document.querySelector("dialog");
const play = document.querySelector("button");

play.addEventListener("click", main);

modal.showModal();

players = document.querySelectorAll(".players>*");
players.forEach((player) => {
    player.addEventListener("click", (event) => {
        event.target.classList.add("selected");
        if (event.target.id == "cat") {
            dog.classList.remove("selected");
        } else {
            cat.classList.remove("selected");
        }
    });
});

const board = (() => {
    let player = document.querySelector(".selected");
    let opponent = document.querySelector(".players>*:not(.selected)");
    let boardDom = document.querySelectorAll("#board div");
    console.log(player, opponent);
    let cells = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
    function place(player, pos) {
        cells[pos.i][pos.j] = player;
    }
    function consoleBoard() {
        for (let i = 0; i < 3; i++) {
            console.log(cells[i][0], cells[i][1], cells[i][2]);
        }
    }

    function drawBoard() {
        boardIndex = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (cells[i][j] === "x") {
                    boardDom[boardIndex].style.backgroundImage =
                        "url('./images/cat.png')";
                } else if (cells[i][j] !== null) {
                    boardDom[boardIndex].style.backgroundImage =
                        "url('./images/dog.jpg')";
                }
                boardIndex++;
            }
        }
    }
    function click() {
        boardDom.forEach((el) => {
            el.addEventListener("click", () => {
                let i = [Math.floor([...boardDom].indexOf(el) / 3)];
                let j = [[...boardDom].indexOf(el) % 3];
                if (cells[i][j] !== null) return;
                cells[i][j] = "x";
                drawBoard();
                if (board.checkWinner("o")) {
                    drawBoard();
                    setTimeout(() => alert("o won"), 0);
                }
                // console.log("time over");
                if (board.checkTie()) setTimeout(() => alert("tie"), 0);
                ai();
            });
        });
    }
    function isEqual(i, j, k) {
        if (i != null && i == j && i == k) {
            if (i == "x") {
                return "x";
            } else return "o";
        }
    }
    function checkRow(player) {
        for (let i = 0; i < 3; i++) {
            if (isEqual(cells[i][0], cells[i][1], cells[i][2]) == player)
                return player;
        }
    }
    function checkCol(player) {
        for (let i = 0; i < 3; i++) {
            if (isEqual(cells[0][i], cells[1][i], cells[2][i]) == player)
                return player;
        }
    }

    function checkDiag(player) {
        if (isEqual(cells[0][0], cells[1][1], cells[2][2]) == player)
            return player;
        if (isEqual(cells[0][2], cells[1][1], cells[2][0]) == player)
            return player;
    }
    function checkWinner(player) {
        if (checkCol(player) || checkRow(player) || checkDiag(player)) {
            return player;
        }
    }
    function checkTie() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (cells[i][j] == null) {
                    return false;
                }
            }
        }
        return true;
    }
    function dis() {
        console.log(board.cells);
    }
    return {
        dis,
        player,
        opponent,
        cells,
        place,
        drawBoard,
        consoleBoard,
        click,
        checkWinner,
        checkTie,
    };
})();

board.click();

board.drawBoard();

function ai() {
    let best;
    if (board.opponent == "x") {
        best = minimax(true);
    } else {
        best = minimax(false);
    }
    board.cells[best.move.i][best.move.j] = board.opponent;
    board.drawBoard();
    if (board.checkWinner("x") || board.checkTie()) alert("X won");
    if (board.checkWinner("o") || board.checkTie()) {
        board.drawBoard();
        setTimeout(() => alert("o won"), 0);
    }
    if (board.checkTie()) setTimeout(() => alert("tie"), 0);
}
function minimax(isMaximizer) {
    if (board.checkWinner("x")) {
        return { score: 10 };
    } else if (board.checkWinner("o")) {
        return { score: -10 };
    } else if (board.checkTie()) {
        return { score: 0 };
    }

    if (isMaximizer) {
        let best = { score: -Infinity, move: {} };
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board.cells[i][j] === null) {
                    board.cells[i][j] = "x";

                    let score = minimax(false).score;

                    if (score > best.score) {
                        best.move = { i, j };
                        best.score = score;
                    }

                    board.cells[i][j] = null;
                }
            }
        }

        return best;
    } else if (!isMaximizer) {
        let best = { score: Infinity, move: {} };
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board.cells[i][j] === null) {
                    board.cells[i][j] = "o";

                    let score = minimax(true).score;

                    if (score < best.score) {
                        best.move = { i, j };
                        best.score = score;
                    }

                    board.cells[i][j] = null;
                }
            }
        }

        return best;
    }
}
