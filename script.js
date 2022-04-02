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