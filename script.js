// Global
let Typewriter = window.Typewriter;
let playerScore = 0;
let computerScore = 0;
let roundNum = 1;
let checkScore = 0;
let messageList = [];
let lineNum = 0;
let delayNum = 55;
let preReverseList = [];
let resultMsg = '';
let winnerChoiceColor = '';
let loserChoiceColor = '';
const cardHand = document.querySelectorAll('.playerCard');
const round = document.querySelector('.round');
const cardRules = {'rock': {
                        'scissors': ' crushes ', 
                        'lizard': ' crushes ',
                        'color': 'hsl(357,26%,42%)'},
                    'paper': {
                        'rock': ' covers ', 
                        'spock': ' disproves ',
                        'color': 'hsl(33, 100%, 80%)'},
                    'scissors':{
                        'paper': ' cuts ', 
                        'lizard': ' decapitates ',
                        'color': 'hsl(4,75%,59%)'},
                    'lizard':{
                        'spock': ' poisons ', 
                        'paper': ' eats ',
                        'color': 'hsl(144,33%,68%)'},
                    'spock':{
                        'scissors': ' smashes ', 
                        'rock': ' vaporizes ',
                        'color': 'hsl(233,43%,56%)'}};
const cardFight = new Map(Object.entries(cardRules));
const restartBtn = document.createElement('button');
const choiceMessage = ["You have chosen ", "Your opponent has chosen "];
const textLine = document.querySelector('.text');

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
        winnerChoiceColor = choiceColor(cardFight.get(playerSelection).color, playerSelection.toUpperCase());
        loserChoiceColor = choiceColor(cardFight.get(computerSelection).color, computerSelection.toUpperCase());
        resultMsg = winnerChoiceColor + cardFight.get(playerSelection)[computerSelection] + loserChoiceColor;
        messageList.push('Yay :) ', resultMsg);
    }
    else {
        computerScore += 1;
        checkScore += 1;
        winnerChoiceColor = choiceColor(cardFight.get(computerSelection).color, computerSelection.toUpperCase());
        loserChoiceColor = choiceColor(cardFight.get(playerSelection).color, playerSelection.toUpperCase());
        resultMsg = winnerChoiceColor + cardFight.get(computerSelection)[playerSelection] + loserChoiceColor;
        messageList.push('Oh no :( ', resultMsg);
    }
    messageList.push(`Score: ${playerScore} vs ${choiceColor('red', computerScore)}`);
}

function typeMessage() {
    let typewriter = new Typewriter(textLine, {delay: 65, deleteSpeed: 35});
    typewriter
    .typeString(messageList[1])
    .pauseFor(1500)
    .typeString(messageList[2] + '<br />')
    .pauseFor(1500)
    .typeString(messageList[3])
    .pauseFor(1500)
    .typeString(messageList[4] + '<br />')
    .pauseFor(1500)
    .typeString(messageList[5] + '<br />')
    .pauseFor(500)
    .typeString(messageList[6] + '<br />')
    .pauseFor(1500)
    .typeString(messageList[7])
    .start();
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
            messageList.push(
                        roundNum.toString(),
                        choiceMessage[0], 
                        choiceColor(cardFight.get(playerSelection).color, playerSelection.toUpperCase()), 
                        choiceMessage[1], 
                        choiceColor(cardFight.get(computerSelection).color, computerSelection.toUpperCase()));
            playRound(playerSelection, computerSelection);
            typeMessage();
            /*
            card.classList.remove('playCard');
            if (checkScore === 5) {
                gameEnd();
            }*/
            roundNum += 1;
        })
    })
}

game()
