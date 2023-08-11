// const board = document.querySelector("#board");

const board = (() => {
    player = "x";
    opponent = "o";

    boardDom = document.querySelectorAll("#board div");
    // function getCells() {
    //     const cells = [];
    //     console.log("updating");
    //     const cellsDom = document.querySelectorAll("#board div");

    //     cellsDom.forEach((cell) => {
    //         cells.push(cell.getAttribute("data-value"));
    //     });
    //     return cells;
    // }

    let cells = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
    ];
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
                    // boardDom[boardIndex].textContent = "x";
                    boardDom[boardIndex].style.backgroundImage =
                        "url('./images/cat.png')";
                } else if (cells[i][j] !== null) {
                    // boardDom[boardIndex].textContent = "o";
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
                // console.log([...boardDom].indexOf(el));

                // if (board.currentPlayer == "y") return;

                let i = [Math.floor([...boardDom].indexOf(el) / 3)];
                let j = [[...boardDom].indexOf(el) % 3];
                if (board.cells[i][j] !== null) return;
                board.cells[i][j] = "x";
                // console.log(board.currentPlayer);
                drawBoard();
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
    function checkRow() {
        // console.log("row");
        for (let i = 0; i < 3; i++) {
            if (isEqual(cells[i][0], cells[i][1], cells[i][2]) == "x")
                return "x";
            if (isEqual(cells[i][0], cells[i][1], cells[i][2]) == "o")
                return "o";
        }
    }
    function checkCol() {
        // console.log("col");
        for (let i = 0; i < 3; i++) {
            if (isEqual(cells[0][i], cells[1][i], cells[2][i]) == "x")
                return "x";
            else if (isEqual(cells[0][i], cells[1][i], cells[2][i]) == "o")
                return "o";
        }
    }

    function checkDiag() {
        // console.log("diag");
        if (isEqual(cells[0][0], cells[1][1], cells[2][2]) == "x") return "x";
        if (isEqual(cells[0][0], cells[1][1], cells[2][2]) == "o") return "o";
        if (isEqual(cells[0][2], cells[1][1], cells[2][0]) == "x") return "x";
        if (isEqual(cells[0][2], cells[1][1], cells[2][0]) == "o") return "o";
        // return isEqual(cells[0][2], cells[1][1], cells[2][0]);
    }
    // cells = [
    //     [null, "o", null],
    //     [null, null, null],
    //     [null, "o", "x"],
    // ];
    // cells = [
    //     ["o", "x", "x"],
    //     [null, "o", "x"],
    //     [null, null, null],
    // ];

    // cells = [
    //     ["o", "x", "o"],
    //     ["x", "x", "o"],
    //     [null, null, null],
    // ];
    // cells = [
    //     ["x", "x", "o"],
    //     [null, "o", null],
    //     [null, null, null],
    // ];

    return {
        player,
        opponent,
        cells,
        drawBoard,
        consoleBoard,
        click,
        checkRow,
        checkCol,
        checkDiag,
    };
})();

board.click();

board.drawBoard();
// function ai() {
//     let bestMoves = [];
//     let bestScore = Infinity;
//     let bestMove;
//     for (let i = 0; i < 3; i++) {
//         for (let j = 0; j < 3; j++) {
//             if (board.cells[i][j] == null) {
//                 board.cells[i][j] = "o";
//                 score = minimax(true);
//                 if (score < bestScore) {
//                     bestScore = score;
//                     bestMove = { i, j };
//                 }
//                 bestMoves.push({ i, j, score });
//                 board.cells[i][j] = null;
//             }
//         }
//     }
//     board.cells[bestMove.i][bestMove.j] = "o";
//     board.drawBoard();
//     console.log(bestMoves);
//     return { bestMoves, bestMove };
// }

function ai(p) {
    let move;
    if (p == "x") {
        move = minimax(true);
    } else {
        move = minimax(false);
    }
    console.log(move);
    board.cells[move.move.i][move.move.j] = "o";
    board.drawBoard();
}
function minimax(isMaximizer) {
    if (
        board.checkCol() == "x" ||
        board.checkRow() == "x" ||
        board.checkDiag() == "x"
    ) {
        return { score: 10 };
    } else if (
        board.checkCol() == "o" ||
        board.checkRow() == "o" ||
        board.checkDiag() == "o"
    ) {
        return { score: -10 };
    }
    let openSpots = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board.cells[i][j] === null) {
                openSpots++;
            }
        }
    }
    // console.log(opetenSpots);
    if (openSpots == 0) {
        return { score: 0 };
    }

    if (isMaximizer) {
        let best = { score: -Infinity, move: {} };
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board.cells[i][j] === null) {
                    board.cells[i][j] = "x";
                    // board.drawBoard();
                    let score = minimax(false).score;
                    // console.log("inside max", score);
                    // if (score > bestScore) {
                    //     // best.score = score;
                    //     // best.move = { i, j };
                    //     console.log({ i, j }, score);
                    // }
                    //
                    if (score > best.score) {
                        // console.log({ i, j }, best.score);
                        best.move = { i, j };
                        best.score = score;
                        // console.log(best);
                    }
                    // bestScore = Math.max(bestScore, score);
                    // if (bestScore == 10) console.log(bestScore, { i, j });
                    board.cells[i][j] = null;
                }
            }
        }
        // if (bestScore == 10) console.log(bestScore, bestMove);
        // move = bestMove;
        return best;
    } else if (!isMaximizer) {
        let best = { score: Infinity, move: {} };
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board.cells[i][j] === null) {
                    board.cells[i][j] = "o";
                    // board.drawBoard();
                    let score = minimax(true).score;
                    // console.log("insid mini", score);
                    // console.log(score);
                    // console.log(score, bestScore);

                    // if (score < best.score) {
                    //     console.log("updating", i, j);
                    //     best.score = score;
                    //     best.move = { i, j };
                    // }
                    if (score < best.score) {
                        // console.log({ i, j });
                        best.move = { i, j };
                        best.score = score;
                    }
                    // bestScore = Math.min(bestScore, score);
                    board.cells[i][j] = null;
                }
            }
        }
        // console.log(best.move);
        // move = bestMove;
        return best;
    }
}
