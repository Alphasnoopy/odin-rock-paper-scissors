// Global
let playerScore = 0;
let computerScore = 0;
let roundNum = 1;
const cardChoices = ["rock","paper","scissors","lizard","spock"];
const cardRules = {'rock':['scissors', 'lizard'],
                    'paper':['rock', 'spock'],
                    'scissors':['paper', 'lizard'],
                    'lizard':['spock', 'paper'],
                    'spock':['scissors', 'rock']};
const cardFight = new Map(Object.entries(cardRules));
const playerScale = document.getElementById('playerScale');
const computerScale = document.getElementById('computerScale');
const balanceScale = document.getElementById('balance');

function getComputerChoice() {
    return cardChoices[Math.floor(Math.random() * cardChoices.length)];
}

function battleCards(listClass) {
    const battleChoice = document.querySelectorAll('.choice');
    let newChoice = document.getElementById(listClass[1]);
    listClass[1] = newChoice.classList;
    battleChoice.forEach((choice) => { 
        choice.removeAttribute('class');
        choice.classList.add(...listClass.shift(), 'choice');
    });
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
    let playerScorePad = (playerScore < 10) ? String(playerScore).padStart(2,'0') : playerScore;
    let computerScorePad = (computerScore < 10) ? String(computerScore).padStart(2,'0') : computerScore;
    playerScale.innerHTML = playerScorePad;
    computerScale.innerHTML = computerScorePad;
    scale();
}

function scale() {
    balanceScale.removeAttribute('class');
    switch(true) {
        case (playerScore === computerScore): balanceScale.classList.add('las', 'la-balance-scale'); break;
        case (playerScore > computerScore): balanceScale.classList.add('las', 'la-balance-scale-left'); break;
        case (playerScore < computerScore): balanceScale.classList.add('las', 'la-balance-scale-right'); break;
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
    const round = document.querySelector('.round');
    cardHand.forEach((card) => {
        card.addEventListener('click', () => {
            card.classList.add('playCard');
            let roundNumPad = (roundNum < 10) ? String(roundNum).padStart(2,'0') : roundNum;
            round.textContent = `~ Round ${roundNumPad} ~`;
            let playerSelection = card.firstElementChild;
            let computerSelection = getComputerChoice();
            battleCards([playerSelection.classList,computerSelection]);
            playRound(playerSelection.id, computerSelection);
            card.classList.remove('playCard');
            roundNum += 1;
        })
    })
}

game()