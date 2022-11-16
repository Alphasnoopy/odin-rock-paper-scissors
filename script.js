// Global
let Typewriter = window.Typewriter;
let playerScore = 0;
let computerScore = 0;
let roundNum = 0;
let checkScore = 0;
let messageList = [];
let lineNum = 0;
delayNum = 75;
const cardHand = document.querySelectorAll('.playerCard');
const round = document.querySelector('.round');
const cardRules = {'rock': {
                        'scissors': 'Rock Crushes Scissors!', 
                        'lizard': 'Rock Crushes Lizard!',
                        'color': 'gray'},
                    'paper': {
                        'rock': 'Paper Covers Rock!', 
                        'spock': 'Paper Disproves Spock!',
                        'color': 'bisque'},
                    'scissors':{
                        'paper': 'Scissors Cuts Paper!', 
                        'lizard': 'Scissors Decapitates Lizard!',
                        'color': 'red'},
                    'lizard':{
                        'spock': 'Lizard Poisons Spock!', 
                        'paper': 'Lizard Eats Paper!',
                        'color': 'green'},
                    'spock':{
                        'scissors': 'Spock Smashes Scissors!', 
                        'rock': 'Spock Vaporizes Rock!',
                        'color': 'blue'}};
const cardFight = new Map(Object.entries(cardRules));
const restartBtn = document.createElement('button');
const choiceMessage = ["You have chosen ", "Your opponent has chosen "];
const textLines = document.querySelectorAll('.text');

function roundNumChange() {
    roundNum += 1;
    let roundNumPad = (roundNum < 10) ? String(roundNum).padStart(2,'0') : roundNum;
    round.textContent = `~ Round ${roundNumPad} ~`;
}

function getComputerChoice() {
    let cardChoices = Object.keys(cardRules);
    return cardChoices[Math.floor(Math.random() * cardChoices.length)];
}

function choiceColor(colorMatch, choiceMatch) {
    return `<span style="color: ${colorMatch}">${choiceMatch}</span>`;
}

function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        messageList.push('Whew, ', 'It\'s a Tie!');
    }
    else if (Object.keys(cardFight.get(playerSelection)).includes(computerSelection)) {
        playerScore += 1;
        checkScore += 1;
        messageList.push('Yay, ', cardFight.get(playerSelection)[computerSelection]);
    }
    else {
        computerScore += 1;
        checkScore += 1;
        messageList.push('Oh no, ', cardFight.get(computerSelection)[playerSelection]);
    }
    messageList.push(`${playerScore} vs ${computerScore}`);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function typeMessage(line, lineMessage) {
    let typewriter = new Typewriter(line, {delay: delayNum});
    typewriter
    .typeString(lineMessage)
    .start();
}

async function MessageSeq() {
    for (const line of textLines) {
        typeMessage(line, messageList[lineNum]);
        await sleep(delayNum * (messageList[lineNum].length + 10));
        lineNum += 1;
    }
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
                    choice.classList.add('changeOpacity');
                }
            });
            messageList.push(choiceMessage[0], 
                        choiceColor(cardFight.get(playerSelection).color, playerSelection.toUpperCase()), 
                        choiceMessage[1], 
                        choiceColor(cardFight.get(computerSelection).color, computerSelection.toUpperCase()));
            playRound(playerSelection, computerSelection);
            const testing = document.querySelectorAll('.testing');
            lineNum = 0;
            MessageSeq();
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
