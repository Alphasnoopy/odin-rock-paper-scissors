// Global
let playerScore = 0;
let computerScore = 0;
let roundNum = 0;
let checkScore = 0;
const cardHand = document.querySelectorAll('.playerCard');
const round = document.querySelector('.round');
const overlay = document.querySelector('.overlay');
const cardChoices = ["rock","paper","scissors","lizard","spock"];
const cardRules = {'rock':['scissors', 'lizard'],
                    'paper':['rock', 'spock'],
                    'scissors':['paper', 'lizard'],
                    'lizard':['spock', 'paper'],
                    'spock':['scissors', 'rock']};
const cardFight = new Map(Object.entries(cardRules));
const compScoreID = document.getElementById('compScore');
const playerScoreID = document.getElementById('playerScore');
const battleChoice = document.querySelectorAll('.choice');
const restartBtn = document.createElement('button');
const gameBody = document.querySelector('.gameBody');

function roundNumChange() {
    roundNum += 1;
    let roundNumPad = (roundNum < 10) ? String(roundNum).padStart(2,'0') : roundNum;
    round.textContent = `~ Round ${roundNumPad} ~`;
}

function getComputerChoice() {
    return cardChoices[Math.floor(Math.random() * cardChoices.length)];
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {

    }
    else if (cardFight.get(playerSelection).includes(computerSelection)) {
        playerScore += 1;
        checkScore += 1;
        playerScoreID.parentNode.classList.add('scoreAddStart');
        playerScoreID.parentNode.classList.add('scoreAddEnd');
    }
    else {
        computerScore += 1;
        checkScore += 1;
    }
    compScoreID.textContent = computerScore;
    playerScoreID.textContent = playerScore;
}

function gameEnd() {
    restartBtn.classList.add('restartBtn');
    restartBtn.textContent = 'Play Again';
    gameBody.appendChild(restartBtn);
    restartBtn.addEventListener('click', () => window.location.reload());
}

function game() {
    cardHand.forEach((card) => {
        card.addEventListener('mouseover', () => {
            card.classList.add('cardhover'); 
        });
        card.addEventListener('mouseout', () => {
            card.classList.remove('cardhover');
        })
        card.addEventListener('click', () => {
            let playerSelection = card.querySelector('.cardName').textContent;
            let computerSelection = getComputerChoice();
            card.classList.add('playCard');
            cardHand.forEach((choice) => {
                choice.disabled = true;
                if(choice != card){
                    choice.classList.add('changeO');
                }
            })
            /*
            roundNumChange();
            playRound(playerSelection.className, computerSelection);
            card.classList.remove('playCard');
            if (checkScore === 5) {
                gameEnd();
            }*/
        })
    })
}

game()
