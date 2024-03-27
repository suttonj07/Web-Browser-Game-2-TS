// first declare all variables ill need 

const box = document.querySelectorAll(".box"); 
// .box selects box class
let playerTurn = document.querySelector("#playerTurn");
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
//this is to track whos up/ if i want o's how would i do that
let running = false;
//switch to true before starting game/did anyway
let statusText;
//need to create all the functions i need to run game below
//below = forEach box we will add an event listener (event is "click" with a callback of box clicked) to each box (how it supposed to work)
//below = startOverBtn with event listener on click invokes the try again
startGame();


function startGame() {
    box.forEach(box => box.addEventListener("click", boxClicked))
    startOverBtn.addEventListener("click", tryAgain);
    playerTurn.textContent = `${currentPlayer} turn`;
    running = true;
}
// shouldnt dollar sign be blue?

function boxClicked() {
    const boxIndex = this.getAttribute("boxIndex");
    if(options[boxIndex] != "" || !running){
        return;
    }

    updateBox(this, boxIndex);
    // changeTurn(); 
    // activte to see if it works = change turn function above
    whoWon();
}
//may have to change index to something else/puts x and o in box
function updateBox(box, index ) {
    options[index] = currentPlayer;
    box.textContent = currentPlayer;

}
//changePlayer= we take current and set it to if current is = x  then we reassing current to o, otherwise its still x.
//text will say current player, its there turn. we are invoking it to say its whoevers turn 
function changeTurn() {
    currentPlayer = (currentPlayer === "X") ? "O" : "X"; 
    // make current player be x otherwise go back to o
    // statusText = `${currentPlayer} turn`;
    console.log(playerTurn)
   console.log(currentPlayer, "currentPlayer")
    if(currentPlayer === "O"){
        playerTurn.innerHTML = `${currentPlayer} turn`;
        console.log(playerTurn)
    }else{
        currentPlayer === "X"
            playerTurn.innerHTML = `${currentPlayer} turn`;
            console.log(playerTurn)
    }
    
}



//committed before starting this seciton below in case of errors/
function whoWon() {
    let gameWon = false;
//the for loop is looping over the arrays/it checks the numbers 0 1 and 2 and checks the options array (all the "" above) if those 3 are not spaces amd same, someone won
    //if no winner, it will check the next "" array/repeats for each set of win conditions
    for(let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];
//if cell a equals empty or cell b equals empty or c equals empty then continue.
        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        //if a b and c are equal then winner
        if(cellA == cellB && cellB == cellC){
          gameWon = true;  
          break;
          //breaks us out of for loop
        }
    }
    if(gameWon){
        statusText = `${currentPlayer} won!`;
        running = false;
    }
    //else if there are spaces then tie
    else if(!options.includes("")){
        statusText = `Tie`;
        running = false;
    }
    else{
        changeTurn();
    }
}

function tryAgain() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer} turn`;
    box.forEach(box => box.textContent = "");
    running= true;
}

