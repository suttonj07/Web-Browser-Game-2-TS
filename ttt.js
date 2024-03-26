// first declare all variables ill need 

const box = document.querySelectorAll(".box"); 
// .box selects box class
const playerTurn = document.querySelector("#playerTurn");
// #playerTurn selects class
const startOverBtn = document.querySelector("#startOverBtn");
// calling the button
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
// need an array of how to actually win. boxes go left to right starting with 0

let options = ["", "", "", "", "", "", "", "", ""]
//placeholders for each cell
let currentPlayer = "X";
//this is to track whos up
let running = false;
//switch to true before starting game

startGame();
//need to create all the functions i need to run game below
//below = forEach box we will add an event listener (even is "click" with a callback of box clicked) to each box (how it supposed to work)
//below = try again with event listener on click invokes the try again
function startGame() {
    box.forEach(box => box.addEventListener("click", boxClicked))
    startOverBtn.addEventListener("click", tryAgain);
    playerTurn.textContent = `${currentPlayer} turn`;
}

function boxClicked() {

}
//may have to change index to something else
function updateBox(box, index ) {

}

function changePlayer() {

}

function whoWon() {

}

function tryAgain() {

}