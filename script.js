// Global
let score = 0;
const rps = ["rock","paper","scissors"];

function getComputerChoice() {
    return rps[Math.floor(Math.random() * rps.length)];
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    if (playerSelection === computerSelection) {
        
    }
    else if ((playerSelection === "rock" && computerSelection === "scissors") 
            || (playerSelection === "paper" && computerSelection === "rock")
            || (playerSelection === "scissors" && computerSelection === "paper")) {
        score += 1;
    }
    else {
        score -= 1;
    }
}

function winner() {
    console.log("~~ Verdict ~~")
    if (score > 0) {
        console.log("Congratulations! You are the winner.");
    }
    else if (score < 0) {
        console.log("Oof! Better luck next time.");
    }
    else {
        console.log("A tie! Great minds think alike.");
    }
}

function game() {
    for (let i = 0; i < 5; i++) {
        console.log(`~~ Round ${i+1} ~~`);
        let playerChoice = prompt("Rock, Paper, or Scissors?: ");
        console.log(playRound(playerChoice, getComputerChoice()));
    }

    winner();
}
