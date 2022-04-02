const random = n => Math.floor(Math.random() * n)

function computerPlay () {
    let n = random(3)
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

function playRound (playerSelection) {
    let computerSelection = computerPlay();
    let result;
    if (playerSelection === undefined) {
        throw new ReferenceError('playerSelection is not defined');
    }
    playerSelection = playerSelection.toLowerCase();
    switch (true) {
        case (playerSelection === 'rock'): {
            if (computerSelection === 'paper') {
                result = 'Lose';
            }
            else if (computerSelection === 'scissors') {
                result = 'Win';
            }
            else {
                result = 'Tie';
            }
        }
        case (playerSelection === 'paper'): {
            if (computerSelection === 'scissors') {
                result = 'Lose';
            }
            else if (computerSelection === 'rock') {
                result = 'Win';
            }
            else {
                result = 'Tie';
            }
        }
        case (playerSelection === 'scissors'): {
            if (computerSelection === 'rock') {
                result = 'Lose';
            }
            else if (computerSelection === 'paper') {
                result = 'Win';
            }
            else {
                result = 'Tie';
            }
        }
        default: {
            throw new ReferenceError('playerSelection is not a valid argument');
        }
    }
}