// =================== DOM QUERIES UP HERE ======================

console.log("Ready to play?")

// =============================== CANVAS ========================
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// this lets the entire webpage be our canvas
let c = canvas.getContext('2d');
//to draw anything on canvas, we need to getContext

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

// ======================= SOUNDS LIVE HERE =======================
const hitSound = new Audio('./game-sounds/ball-hitting-paddle-sound.wav');
const gainPoint = new Audio('./game-sounds/point-gained-sound.wav');
const loseSound = new Audio('./game-sounds/losing-sound.wav');
const winnerSound = new Audio('./game-sounds/you-won-sound.wav');

// ================== JS FOR THE BALL ===========================


//this sets up how the ball appears
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2, //this x & y center the ball on the canvas
    radius: 10,
    speed: 5,
    dx: 5,
    dy: 5,
    color: 'black',
}

//this function is for actually making the ball appear on the canvas
function drawBall(x, y, radius, color) {
    x.fillStyle = color;
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, true);
    c.closePath();
    x.fill();
}


//this is the movement of the ball

//this RESETS the ball when it hits the canvas/the edge
function reset() {
    ball.x = canvas.width / 2; //the middle of the canvas along x-axis
    ball.y = canvas.height / 2; //middle along the canvas' y-axis
    ball.speed = 7;

    ball.dx = -ball.dx; //reverses the direction
    ball.dy = -ball.dy;
}


// ========================= JS FOR THE PADDLES ================
const paddleWidth = 10;
const paddleHeight = 100;

let upArrowPressed = false;
let downArrowPressed = false;

const playerOne = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'black',
    score: 0,
};

const comp = {
    x: canvas.width - (paddleWidth + 10), //sets up the comp paddle across the player Paddle
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'black',
    score: 0,
};
// console.log(playerOne) - sanity check
// console.log(comp) - sanity check

//this is the Paddle function
function drawPaddle(x, y, width, height, color) {
    c.fillStyle = color;
    c.fillRect(x, y, width, height);
}

//this function is for the EventListeners - trigger to move the Player Paddle!!! - currently set up for Up & Down arrow key
// -STRETCH GOAL: use mouse to move the Paddles -

function keyDown(event) { //activated when key is pressed
    switch(event.code) {
        case "ArrowUp":
            upArrowPressed = true;
            break;
        case "ArrowDown":
            downArrowPressed = true;
            break;
    }
}

function keyUp(event) { //activates when the key is released/let go/no longer pressed
    switch(event.code) {
        case "ArrowUp":
            upArrowPressed = false;
            break;
        case "ArrowDown":
            downArrowPressed = false;
            break;
    }
}


//========================== GAME LOOP ========================

//this will be the Scoring function

function Score(x, y, score){
    c.fillStyle = 'black';
    c.font = '35px sans-serif';
}


// this detects the COLLISION of the ball to the paddles
function getDistance() {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
}



//this will LOOP the game 
