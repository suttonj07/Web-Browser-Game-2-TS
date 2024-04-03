const box = document.querySelectorAll(".box"); 
let playerTurn = document.querySelector("#playerTurn");
const startOverBtn = document.querySelector("#startOverBtn");
// An array of possible ways to win. Each number is assoiciated with a box.
const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 4, 8],
        [1, 4, 7],
        [0, 3, 6],
        [2, 5, 8],
        [2, 4, 6]
];

let options = ["", "", "", "", "", "", "", "", ""]
let currentPlayer = "X";
let running = false;
let statusText;
let player1Count = 0
let player2Count = 0
let tieCount = 0

function startGame() {
    box.forEach(box => box.addEventListener("click", boxClicked))
    startOverBtn.addEventListener("click", tryAgain);
    playerTurn.textContent = `${currentPlayer} turn`;
    running = true;
}

function boxClicked() {
    const boxIndex = this.getAttribute("boxIndex");
    if(options[boxIndex] != "" || !running){
        return;
    }

    updateBox(this, boxIndex);
  
    whoWon();
}

function updateBox(box, index ) {
    options[index] = currentPlayer;
    box.textContent = currentPlayer;
}

function changeTurn() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X"; 
    // Making the current player "x", if not, go back to "o".

    if(currentPlayer === "O"){
        playerTurn.innerHTML = `${currentPlayer} turn`;
       
    }else{
        currentPlayer === "X"
        playerTurn.innerHTML = `${currentPlayer} turn`;
    }
}

function whoWon() {
    let gameWon = false;

    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

    if(cellA == "" || cellB == "" || cellC == ""){
          continue;
        }
     
    if(cellA == cellB && cellB == cellC){
          gameWon = true;  
          break;
        }
    }
    if(gameWon){
        playerTurn.innerHTML = `${currentPlayer} won`;
        running = false;
        if (currentPlayer === "X") {
            player1Count++ 

            updateScoreboard();
        }
        if (currentPlayer === "O") {
            player2Count++ 
            
            updateScoreboard();
        }
    }
    
    else if(!options.includes("")){
        playerTurn.innerHTML = `Tie`;
        running = false;
        tieCount++
        updateScoreboard();
  
    }
    else{
        changeTurn();
    }
}

function tryAgain() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText = `${currentPlayer} turn`;
    box.forEach(box => box.textContent = "");
    running= true;
    playerTurn.innerHTML = `${currentPlayer} turn`;
}

function updateScoreboard() {
   let p1Score = document.getElementById('p1score');
   p1Score.innerHTML = player1Count
   let p2Score = document.getElementById('p2score');
   p2Score.innerHTML = player2Count
   let tieScore = document.getElementById('tiescore');
   tieScore.innerHTML = tieCount
}

startGame();

