const box = document.querySelectorAll<HTMLElement>(".box"); 
let playerTurn = document.querySelector<HTMLElement>("#playerTurn");
const startOverBtn = document.querySelector<HTMLElement>("#startOverBtn");

const winConditions: number[][] = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [1, 4, 7],
    [0, 3, 6],
    [2, 5, 8],
    [2, 4, 6]
];

let options: string[] = ["", "", "", "", "", "", "", "", ""];
let currentPlayer: string = "X";
let running: boolean = false;
let statusText: string;
let player1Count: number = 0;
let player2Count: number = 0;
let tieCount: number = 0;

function startGame(): void {
    box.forEach(box => box.addEventListener("click", boxClicked));
    startOverBtn?.addEventListener("click", tryAgain);
    if (playerTurn) {
        playerTurn.textContent = `${currentPlayer} turn`;
    }
    running = true;
}

function boxClicked(this: HTMLElement): void {
    const boxIndex = this.getAttribute("boxIndex");
    if (!boxIndex || options[parseInt(boxIndex)] !== "" || !running) {
        return;
    }

    updateBox(this, parseInt(boxIndex));
    whoWon();
}

function updateBox(box: HTMLElement, index: number): void {
    options[index] = currentPlayer;
    box.textContent = currentPlayer;
}

function changeTurn(): void {
    currentPlayer = (currentPlayer === "X") ? "O" : "X";
    if (playerTurn) {
        playerTurn.innerHTML = `${currentPlayer} turn`;
    }
}

function whoWon(): void {
    let gameWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        const cellA = options[a];
        const cellB = options[b];
        const cellC = options[c];

        if (cellA === "" || cellB === "" || cellC === "") {
            continue;
        }

        if (cellA === cellB && cellB === cellC) {
            gameWon = true;
            break;
        }
    }

    if (gameWon) {
        if (playerTurn) {
            playerTurn.innerHTML = `${currentPlayer} won`;
        }
        running = false;

        if (currentPlayer === "X") {
            player1Count++;
        } else if (currentPlayer === "O") {
            player2Count++;
        }

        updateScoreboard();
    } else if (!options.includes("")) {
        if (playerTurn) {
            playerTurn.innerHTML = "Tie";
        }
        running = false;
        tieCount++;
        updateScoreboard();
    } else {
        changeTurn();
    }
}

function tryAgain(): void {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    box.forEach(box => (box.textContent = ""));
    running = true;
    if (playerTurn) {
        playerTurn.innerHTML = `${currentPlayer} turn`;
    }
}

function updateScoreboard(): void {
    const p1Score = document.getElementById('p1score');
    if (p1Score) {
        p1Score.innerHTML = player1Count.toString();
    }

    const p2Score = document.getElementById('p2score');
    if (p2Score) {
        p2Score.innerHTML = player2Count.toString();
    }

    const tieScore = document.getElementById('tiescore');
    if (tieScore) {
        tieScore.innerHTML = tieCount.toString();
    }
}

startGame();
