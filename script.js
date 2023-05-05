const random = n => Math.floor(Math.random() * n)

let computerScore = 0;
let playerScore = 0;
let roundCount = 0;

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
    const resultDiv = document.querySelector('#result');

    let computerSelection = computerPlay();
    let result = getOutcome(playerSelection, computerSelection);

    if (result === 'Win') {
        resultDiv.textContent = `You win, ${playerSelection} beats ${computerSelection}!`;
    }
    else if (result === 'Lose') {
        resultDiv.textContent = `You lose, ${computerSelection} beats ${playerSelection}.`;
    }
    else {
        resultDiv.textContent = `You tie, ${computerSelection} ties with ${playerSelection}.`;
    }
    return result;
}

function setup () {
    const container = document.querySelector('.container');

    if (document.querySelector('#output') != undefined) {
        const output = document.querySelector("#output");
        container.removeChild(output);
    }

    start.classList.add("invisible");

    const input = document.createElement('div');
    input.setAttribute("id", "input");

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

    const output = document.createElement('div');
    output.setAttribute("id", "output");

    const scoreLeft = document.createElement('div');
    scoreLeft.classList.add("score", "left");

    const scoreLeftTitle = document.createElement('h2');
    scoreLeftTitle.classList.add("score-title");
    scoreLeftTitle.textContent = "You";

    const scoreLeftCounter = document.createElement('p');
    scoreLeftCounter.classList.add("score-counter");
    scoreLeftCounter.textContent = "0";

    scoreLeft.appendChild(scoreLeftCounter);
    scoreLeft.appendChild(scoreLeftTitle);
    output.appendChild(scoreLeft);

    const result = document.createElement('p');
    result.setAttribute("id", "result");
    output.appendChild(result);

    const scoreRight = document.createElement('div');
    scoreRight.classList.add("score", "right");

    const scoreRightTitle = document.createElement('h2');
    scoreRightTitle.classList.add("score-title");
    scoreRightTitle.textContent = "AI";

    const scoreRightCounter = document.createElement('p');
    scoreRightCounter.classList.add("score-counter");
    scoreRightCounter.textContent = "0";

    scoreRight.appendChild(scoreRightCounter);
    scoreRight.appendChild(scoreRightTitle);
    output.appendChild(scoreRight);

    container.insertBefore(output, input);
}

function declareWinner () {
    console.log("declaring winner");
    const result = document.querySelector("#result");
    if (playerScore > computerScore) {
        result.textContent = "You win!";
    }
    else if (playerScore < computerScore) {
        result.textContent = "You lose.";
    }
    else {
        result.textContent = "You tie.";
    }
}

function startGame (e) {
    if (e.target.id != "start") return;

    setup();

    const btns = document.querySelectorAll('.btn');
    
    btns.forEach(btn => btn.addEventListener('click', function (e) {
        const scoreLeft = document.querySelector(".left");
        const scoreLeftCounter = scoreLeft.querySelector(".score-counter");
        const scoreRight = document.querySelector(".right")
        const scoreRightCounter = scoreRight.querySelector(".score-counter");

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
        scoreLeftCounter.textContent = `${playerScore}`;
        scoreRightCounter.textContent = `${computerScore}`;

        roundCount++;

        if (roundCount == 5) {
            declareWinner();
            const container = document.querySelector(".container");
            const input = document.querySelector("#input");
            container.removeChild(input);

            const start = document.querySelector("#start");
            start.textContent = "Restart";
            start.classList.remove("invisible");
            computerScore = 0;
            playerScore = 0;
            roundCount = 0;
        }
    }));
}

const container = document.querySelector('.container');

const start = document.createElement('button');
start.textContent = "Start";
start.setAttribute("id", "start");

container.appendChild(start);

start.addEventListener('click', function (e) {
    startGame (e);
});