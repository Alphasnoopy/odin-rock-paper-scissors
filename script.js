// Global
let playerScore = 0;
let computerScore = 0;
const cardChoices = ["rock","paper","scissors","lizard","spock"];
const cardRules = {'rock':['scissors', 'lizard'],
                    'paper':['rock', 'spock'],
                    'scissors':['paper', 'lizard'],
                    'lizard':['spock', 'paper'],
                    'spock':['scissors', 'rock']};
const cardFight = new Map(Object.entries(cardRules));

function getComputerChoice() {
    return cardChoices[Math.floor(Math.random() * cardChoices.length)];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {

    }
    else if (cardFight.get(playerSelection).includes(computerSelection)) {
        playerScore += 1;
    }
    else {
        computerScore += 1;
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
    const cardHand = document.querySelectorAll('.card');
    cardHand.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.add('playCard');
            let playerSelection = card.querySelector('.cardName').innerHTML;
            playRound(playerSelection,getComputerChoice());
            card.classList.remove('playCard');
        })
    })
}

game()