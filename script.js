const random = n => Math.floor(Math.random() * n)

function computerPlay () {
    let n = random(3);
    let move;
    if (n === 0) {
        move = "rock";
    }
    else if (n === 1) {
        move = "paper";
    }
    else {
        move = "scissors";
    }
    return move;
}

function getOutcome (playerSelection, computerSelection) {
    let result;
    if (playerSelection === undefined) {
        throw new ReferenceError('playerSelection is not defined');
    }
    playerSelection = playerSelection.toLowerCase();
    switch (true) {
        case (playerSelection === 'rock'): {
            if (computerSelection === 'paper') {
                result = 'Lose';
                return result;
            }
            else if (computerSelection === 'scissors') {
                result = 'Win';
                return result;
            }
            else {
                result = 'Tie';
                return result;
            }
        }
        case (playerSelection === 'paper'): {
            if (computerSelection === 'scissors') {
                result = 'Lose';
                return result;
            }
            else if (computerSelection === 'rock') {
                result = 'Win';
                return result;
            }
            else {
                result = 'Tie';
                return result;
            }
        }
        case (playerSelection === 'scissors'): {
            if (computerSelection === 'rock') {
                result = 'Lose';
                return result;
            }
            else if (computerSelection === 'paper') {
                result = 'Win';
                return result;
            }
            else {
                result = 'Tie';
                return result;
            }
        }
        default: {
            throw new ReferenceError('playerSelection is not a valid argument');
        }
    }
}

const container = document.querySelector('.container');

const resultDiv = document.createElement('result');
resultDiv.classList.add("result");

function playRound (playerSelection) {
    let computerSelection = computerPlay();
    let result = getOutcome(playerSelection, computerSelection);
    if (result === 'Win') {
        resultDiv.textContent = `You win, ${playerSelection} beats ${computerSelection}!`;
    }
    else if (result === 'Lose') {
        resultDiv.textContent = `You lose, ${computerSelection} beats ${playerSelection}.`;
    }
    else {
        resultDiv.textContent = `You tie, ${computerSelection} ties with ${playerSelection}`;
    }
    return result;
}

container.appendChild(resultDiv);

/* function game () {
    let computerScore = 0;
    let playerScore = 0;
    for (let i = 0; i < 5; i++) {
        let result = playRound(playerSelection);
        if (result === 'Win') {
            playerScore++;
        }
        else if (result === 'Lose') {
            computerScore++;
        }
        else {
            playerScore++;
            computerScore++;
        }
    }
    console.log(`The score is ${playerScore}:${computerScore}.`);
} */

const btns = document.querySelectorAll('.btn');

btns.forEach(btn => btn.addEventListener('click', function (e) {
    playRound(e.target.id);
}));