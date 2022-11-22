// Global
// Use typewriter function from global
let Typewriter = window.Typewriter;
let playerScore = 0;
let computerScore = 0;
let roundNum = 1;
let checkScore = 0;
let resultMsg = '';
let winnerChoiceColor = '';
let loserChoiceColor = '';
// List of text to use in typewriter in order
let messageList = [];
const cardHand = document.querySelectorAll('.playerCard');
const round = document.querySelector('.round');
const cardRules = {'rock': {
                        'scissors': ' crushes ', 
                        'lizard': ' crushes ',
                        'color': 'rockColor'},
                    'paper': {
                        'rock': ' covers ', 
                        'spock': ' disproves ',
                        'color': 'paperColor'},
                    'scissors':{
                        'paper': ' cuts ', 
                        'lizard': ' decapitates ',
                        'color': 'scissorsColor'},
                    'lizard':{
                        'spock': ' poisons ', 
                        'paper': ' eats ',
                        'color': 'lizardColor'},
                    'spock':{
                        'scissors': ' smashes ', 
                        'rock': ' vaporizes ',
                        'color': 'spockColor'}};
const cardFight = new Map(Object.entries(cardRules));
const choiceMessage = ["You have chosen ", "Your opponent has chosen "];
const textLine = document.querySelector('.text');
let typewriter = new Typewriter(textLine, {delay: 45});
const ending = document.querySelector('.ending');
const finalResult = document.querySelector('.finalResult');
const restartBtn = document.querySelector('.restart');

// Random Computer Choice
function getComputerChoice() {
    let cardChoices = Object.keys(cardRules);
    return cardChoices[Math.floor(Math.random() * cardChoices.length)];
}

// Return choice with appropriate color
function choiceColor(colorMatch, choiceMatch) {
    return `<span class=${colorMatch}>${choiceMatch}</span>`;
}

// Use selected player choice and computer choice to determne outcome
function playRound(playerSelection, computerSelection) {
    if (playerSelection === computerSelection) {
        messageList.push('Whew, ', 'It\'s a Tie!');
    }
    // Use player selection as map key to see if computer choice is a strength
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

// Type each string in list on the appropriate lines
function typeMessage() {
    typewriter
    .typeString(messageList[1])
    .pauseFor(750)
    .typeString(messageList[2] + '<br />')
    .pauseFor(750)
    .typeString(messageList[3])
    .pauseFor(750)
    .typeString(messageList[4] + '<br />')
    .pauseFor(750)
    .typeString(messageList[5] + '<br />')
    .pauseFor(250)
    .typeString(messageList[6] + '<br />')
    .pauseFor(750)
    .typeString(messageList[7])
    .start();
}

// Promise resolves when 'ms' time has passed
function sleep(ms) {
    return new Promise ((resolve) => {
        setTimeout(resolve, ms)
    });
}

// Check if score is equal to 5 to end game, or reset variables/classlist
async function scoreCheck(cardHand) {
    console.log(checkScore);
    if (checkScore === 5){
        console.log("i am here");
        typeMessage();
        await sleep(10000);
        gameEnd();
    }
    else {
        typeMessage();
        await sleep(10000);
        cardHand.forEach((choice) => {
            choice.disabled = false;
            choice.classList.remove('changeOpacity');
            choice.classList.remove('playCard');
            choice.classList.remove('cursorChange');
        });
        messageList = [];
    }
}

function removeText() {
    typewriter
    .deleteAll(1)
    .start();
}

async function checkRemove(cardHand) {
    removeText();
    await sleep(2000);
    scoreCheck(cardHand);
}

// Game Ending, show result and button to play again
function gameEnd() {
    ending.style = 'visibility: visible; opacity: 1';
    if (computerScore > playerScore) {
        finalResult.textContent = 'You Lose!';
        finalResult.style = 'color: red';
    }
    restartBtn.style = 'cursor: pointer';
    restartBtn.disabled = false;
    restartBtn.addEventListener('click', () => window.location.reload());
}

function game() {
    // For each card, listen for a click
    cardHand.forEach((card) => {
        card.addEventListener('click', () => {
            let playerSelection = card.querySelector('.cardName').textContent;
            let computerSelection = getComputerChoice();
            card.classList.add('playCard');
            // Disable clicking for all card buttons, lower opacity for all except chosen
            cardHand.forEach((choice) => {
                choice.classList.add('cursorChange');
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
            // If else statement to avoid settimeout/sleep during remove typewriter function in beginning
            if (textLine.textContent !== "|") {
                checkRemove(cardHand);
            }
            else {
                scoreCheck(cardHand);
            }     
            roundNum += 1;
        })
    })
}

game()
