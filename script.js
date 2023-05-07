const DEFAULT_MODE = "best";
const DEFAULT_WIN = 5;

const random = n => Math.floor(Math.random() * n)

let currentMode = DEFAULT_MODE;
let currentWin = DEFAULT_WIN;
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
    const resultTitle = document.querySelector('#resultTitle');
    const resultText = document.querySelector('#resultText');

    let computerSelection = computerPlay();
    let result = getOutcome(playerSelection, computerSelection);

    if (result === 'Win') {
        resultTitle.textContent = "You win";
        resultText.textContent = `${playerSelection} beats ${computerSelection}`;
    }
    else if (result === 'Lose') {
        resultTitle.textContent = "You lose";
        resultText.textContent = `${computerSelection} beats ${playerSelection}`;
    }
    else {
        resultTitle.textContent = "You tie";
        resultText.textContent = `${computerSelection} ties with ${playerSelection}`;
    }
    return result;
}

function setupGame () {
    const container = document.querySelector('.container');

    if (document.querySelector('#output') != undefined) {
        const output = document.querySelector("#output");
        container.removeChild(output);
    }

    // Hide #home
    home.innerHTML = '';

    // Start #input
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
    // End #input

    // Start #output
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

    const result = document.createElement('div');
    result.setAttribute("id", "resultDiv");

    const resultTitle = document.createElement('h2');
    resultTitle.setAttribute("id", "resultTitle");

    const resultText = document.createElement('p');
    resultText.setAttribute("id", "resultText");

    result.appendChild(resultTitle);
    result.appendChild(resultText);
    output.appendChild(result);

    const scoreRight = document.createElement('div');
    scoreRight.classList.add("score", "right");

    const scoreRightTitle = document.createElement('h2');
    scoreRightTitle.classList.add("score-title");
    scoreRightTitle.textContent = "RPS";

    const scoreRightCounter = document.createElement('p');
    scoreRightCounter.classList.add("score-counter");
    scoreRightCounter.textContent = "0";

    scoreRight.appendChild(scoreRightCounter);
    scoreRight.appendChild(scoreRightTitle);
    output.appendChild(scoreRight);

    container.insertBefore(output, input);
    // End #output
    return;
}

function declareWinner () {
    const result = document.querySelector("#resultTitle");
    if (playerScore > computerScore) {
        result.textContent = "You win!";
    }
    else if (playerScore < computerScore) {
        result.textContent = "You lose";
    }
    else {
        result.textContent = "You tie";
    }
    return;
}

function startGame (e, currentMode, currentWin) {
    if (e.target.id != "start") return;

    console.log(currentMode);
    console.log(currentWin);
    setupGame();

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
            const input = document.querySelector("#input");
            input.innerHTML = '';

            const home = document.querySelector("#home");

            makeStartBtn();
            start.textContent = "Restart";

            makeHomeBtn();

            computerScore = 0;
            playerScore = 0;
            roundCount = 0;
        }
    }));
    return;
}

function makeStartBtn  () {
    const start = document.createElement('button');
    start.textContent = "Start";
    start.classList.add("btn");
    start.setAttribute("id", "start");

    home.appendChild(start);

    start.addEventListener('click', function (e) {
        const container = document.querySelector(".container");
        const input = document.querySelector("#input");
        if (input != null) container.removeChild(input);
        startGame (e, currentMode, currentWin);
    });
    return;
}

function makeRulesBtn () {
    const home = document.querySelector("#home");

    const rulesBtn = document.createElement("button");
    rulesBtn.classList.add("btn");
    rulesBtn.setAttribute("id", "rules");
    rulesBtn.textContent = "Rules";

    home.appendChild(rulesBtn);

    rulesBtn.addEventListener('click', function () {
        setupRules();
    });
    return;
}

function makeHomeBtn () {
    const home = document.querySelector("#home");

    const homeBtn = document.createElement('button');
    homeBtn.classList.add("btn");
    homeBtn.setAttribute("id", "homeBtn");
    homeBtn.textContent = "Home";

    home.appendChild(homeBtn);

    homeBtn.addEventListener('click', function () {
        home.removeChild(homeBtn);
        setupHome();
    });
    return;
}

function setupRules () {
    const container = document.querySelector(".container");
    const home = document.querySelector("#home");

    home.innerHTML = "";

    const rulesDiv = document.createElement('div');
    rulesDiv.setAttribute("id", "rulesDiv");

    const p1 = document.createElement('p');
    p1.textContent = "Welcome, to Rock Paper Scissors (RPS) the most skill-based and most difficult game in existance.";
    const p2 = document.createElement('p');
    p2.textContent = "In case you don't know them yet, here are the rules:"
    const p3 = document.createElement('p');
    p3.textContent = "Rock beats Paper";
    const p4 = document.createElement('p');
    p4.textContent = "Paper beats Scissors";
    const p5 = document.createElement('p');
    p5.textContent = "Scissors beats Paper";

    rulesDiv.appendChild(p1);
    rulesDiv.appendChild(p2);
    rulesDiv.appendChild(p3);
    rulesDiv.appendChild(p4);
    rulesDiv.appendChild(p5);
    container.insertBefore(rulesDiv, home);

    makeHomeBtn();

    return;
}

function setupHome () {
    const container = document.querySelector(".container");

    const output = document.querySelector('#output');
    if (output != null) container.removeChild(output);

    const input = document.querySelector('#input');
    if (input != null) container.removeChild(input);

    const rulesDiv = document.querySelector('#rulesDiv');
    if (rulesDiv != null) container.removeChild(rulesDiv);

    const home = document.querySelector('#home');

    home.innerHTML = '';

    makeStartBtn();
    makeRulesBtn();

    return;
}

setupHome();