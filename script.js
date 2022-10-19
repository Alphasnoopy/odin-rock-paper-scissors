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
            return "You Win! Rock beats Scissors";
        }
        else if (computerSelection == "paper") {
            return "You Lose! Paper beats Rock";
        }
        else {
            return "It's a tie!";
        }
    }
    else if (playerSelection == "paper") {
        if (computerSelection == "rock") {
            return "You Win! Paper beats Rock";
        }
        else if (computerSelection == "scissors"){
            return "You Lose! Scissors beats Paper";
        }
        else {
            return "It's a tie!";
        }
    }
    else {
        if (computerSelection == "paper") {
            return "You Win! Scissors beats Paper";
        }
        else if (computerSelection == "rock") {
            return "You Lose! Rock beats Scissors";
        }
        else {
            return "It's a tie!";
        }
    }
}
