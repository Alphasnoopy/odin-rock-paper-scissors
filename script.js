// Global
let score = 0;

function getComputerChoice() {
    const max = 3;
    const choice = Math.floor(Math.random() * max);
    switch (choice) {
        case 0:
            return "rock";
            break;
        case 1:
            return "paper";
            break;
        case 2:
            return "scissors";
            break;
    }
}

function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
    if (playerSelection == "rock") {
        if (computerSelection == "scissors") {
            score += 1;
            return "You Win! Rock beats Scissors";
        }
        else if (computerSelection == "paper") {
            score -= 1;
            return "You Lose! Paper beats Rock";
        }
        else {
            return "It's a tie!";
        }
    }
    else if (playerSelection == "paper") {
        if (computerSelection == "rock") {
            score += 1;
            return "You Win! Paper beats Rock";
        }
        else if (computerSelection == "scissors"){
            score -= 1;
            return "You Lose! Scissors beats Paper";
        }
        else {
            return "It's a tie!";
        }
    }
    else {
        if (computerSelection == "paper") {
            score += 1;
            return "You Win! Scissors beats Paper";
        }
        else if (computerSelection == "rock") {
            score -= 1;
            return "You Lose! Rock beats Scissors";
        }
        else {
            return "It's a tie!";
        }
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

game();
