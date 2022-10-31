// Global
let playerScore = 0;
let computerScore = 0;
let roundNum = 1;
let checkScore = 0;
const cardHand = document.querySelectorAll('.card');
const round = document.querySelector('.round');
const overlay = document.querySelector('.overlay');
const cardChoices = ["rock","paper","scissors","lizard","spock"];
const cardRules = {'rock':['scissors', 'lizard'],
                    'paper':['rock', 'spock'],
                    'scissors':['paper', 'lizard'],
                    'lizard':['spock', 'paper'],
                    'spock':['scissors', 'rock']};
const orignCards = document.querySelector('.battleArea').children;
const cardFight = new Map(Object.entries(cardRules));
const scores = document.querySelectorAll('.score');
const playerScale = document.getElementById('playerScale');
const computerScale = document.getElementById('computerScale');
const balanceScale = document.getElementById('balance');
const battleChoice = document.querySelectorAll('.choice');
const restartBtn = document.createElement('button');
const gameBody = document.querySelector('.gameBody');

function getComputerChoice() {
    return cardChoices[Math.floor(Math.random() * cardChoices.length)];
}

function battleCards(listClass) {
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
        checkScore += 1;
    }
    else {
        computerScore += 1;
        checkScore += 1;
    }
    let playerScorePad = (playerScore < 10) ? String(playerScore).padStart(2,'0') : playerScore;
    let computerScorePad = (computerScore < 10) ? String(computerScore).padStart(2,'0') : computerScore;
    playerScale.textContent = playerScorePad;
    computerScale.textContent = computerScorePad;
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

function restart() {
    gameBody.removeChild(restartBtn);
    playerScore = 0;
    computerScore = 0;
    roundNum = 1;
    round.textContent = `~ Round ?? ~`;
    scores.forEach((side) => side.textContent = '??');
    balanceScale.removeAttribute('class');
    balanceScale.classList.add('las', 'la-balance-scale');
}

function gameEnd() {
    restartBtn.classList.add('restartBtn');
    restartBtn.textContent = 'Play Again';
    gameBody.appendChild(restartBtn);
    restartBtn.addEventListener('click', () => window.location.reload());
}

function game() {
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
            if (checkScore === 5) {
                gameEnd();
            }
        })
    })
}

game()