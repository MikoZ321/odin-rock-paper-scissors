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

function playRound (playerSelection) {
    const resultDiv = document.querySelector('.result');

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

function setup () {
    const container = document.querySelector('.container');

    container.removeChild(start);

    const input = document.createElement('div');
    input.classList.add('input');

    const rock = document.createElement('button');
    rock.textContent = "Rock";
    rock.classList.add("btn");
    rock.setAttribute("id", "rock");

    const paper = document.createElement('button');
    paper.textContent = "Paper";
    paper.classList.add("btn");
    paper.setAttribute("id", "paper");

    const scissors = document.createElement('button');
    scissors.textContent = "Scissors"
    scissors.classList.add("btn");
    scissors.setAttribute("id", "scissors");

    input.appendChild(rock);
    input.appendChild(paper);
    input.appendChild(scissors);

    container.appendChild(input);

    const resultDiv = document.createElement('div');
    resultDiv.classList.add("result");

    container.appendChild(resultDiv);
}

function startGame (e) {
    if (e.target.classList != "start") return;

    setup();

    let computerScore = 0;
    let playerScore = 0;
    let roundCount = 0;

    const btns = document.querySelectorAll('.btn');
    
    btns.forEach(btn => btn.addEventListener('click', function (e) {
        let result = playRound(e.target.id);
        if (result == "Win") {
            playerScore++;
        }
        else if (result == "Lose") {
            computerScore++;
        }
        else {
            playerScore++;
            computerScore++;
        }
        roundCount++;
        console.log(`${roundCount}: ${playerScore} vs ${computerScore}`);
    }));
}

const container = document.querySelector('.container');

const start = document.createElement('button');
start.textContent = "Start";
start.classList.add('start');

container.appendChild(start);

start.addEventListener('click', function (e) {
    startGame (e);
});