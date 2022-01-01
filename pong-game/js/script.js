
console.log("Ready to play?")

// =============================== CANVAS ========================
let canvas = document.querySelector('canvas');
// canvas.width = window.innerWidth;
// canvas.height = window.innerHeight;
// this lets the entire webpage be our canvas
canvas.width = 1000;
canvas.height = 750;

let c = canvas.getContext('2d');
//to draw anything on canvas, we need to getContext

window.addEventListener('keydown', keyDown());
window.addEventListener('keyup', keyUp());
// console.log(keyDown)

// ======================= SOUNDS LIVE HERE =======================
// const hitSound = new Audio('./game-sounds/ball-hitting-paddle-sound.wav');
// const gainPoint = new Audio('./game-sounds/point-gained-sound.wav');
// const loseSound = new Audio('./game-sounds/losing-sound.wav');
//stretch goal if game works

// ================== JS FOR THE BALL ===========================


//this sets up how the ball appears
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2, //this x & y center the ball on the canvas
    radius: 15,
    speed: 7,
    dx: 5,
    dy: 5,
    color: 'black',
}

//this function is for how the ball appears on the canvas
function drawBall(x, y, radius, color) {
    c.fillStyle = color;
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();
}


//this is the movement of the ball

//this RESETS the ball when it hits the canvas/the edge
function reset() {
    ball.x = canvas.width / 2; //the middle of the canvas along x-axis
    ball.y = canvas.height / 2; //middle along the canvas' y-axis
    ball.speed = 7;

    ball.dx = -ball.dx; // changes the direction
    ball.dy = -ball.dy;
}


// ========================= JS FOR THE PADDLES ================
let paddleWidth = 15;
let paddleHeight = 200;

let upArrowPressed = false;
let downArrowPressed = false;

let playerOne = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'black',
    score: 0,
};

let comp = {
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
// -STRETCH GOAL: use mouse to move the Paddle

function keyDown(KeyboardEvent) { //activated when key is pressed
    switch (KeyboardEvent) {
        case 'ArrowUp':
            upArrowPressed = true;
            break;
        case "ArrowDown":
            downArrowPressed = true;
            break;
    }
}

function keyUp(event) { //activates when the key is released/let go/no longer pressed
    switch (KeyboardEvent) {
        case "ArrowUp":
            upArrowPressed = false;
            break;
        case "ArrowDown":
            downArrowPressed = false;
            break;
    }
}


//========================== GAME FUNCTIONS ========================

//this will be the Scoring function

function Score(x, y, score) {
    c.fillStyle = 'black';
    c.font = '40px sans-serif';

    c.fillText(score, x, y);

}


// this detects the COLLISION of the ball to the paddles
function getDistance(player, ball) { //take all sides of the ball & players to determine where/if they collide
    player.top = player.y;
    player.right = player.x + player.width;
    player.bottom = player.y + player.height;
    player.left = player.x;

    ball.top = ball.y - ball.radius;
    ball.right = ball.x + ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.left = ball.x - ball.radius;

    return ball.left < player.right && ball.top < player.bottom && ball.right > player.left && ball.bottom > player.top;
}


function update() {
    // moves the player paddle
    if (upArrowPressed && playerOne.y > 0) {
        playerOne.y -= 8;
    } else if (downArrowPressed && (playerOne.y < canvas.height - playerOne.height)) {
        playerOne.y += 8;
    }

    // checks if ball hits top or bottom
    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        ball.dy = -ball.dy;
    }

    // if the ball hits past the right paddle (past the comp)
    if (ball.x + ball.radius >= canvas.width) {

        // then player scored 1 point!
        playerOne.score += 1;
        reset();
    }

    // if ball hit on left wall
    if (ball.x - ball.radius <= 0) {

        // the comp will score 1 point
        comp.score += 1;
        reset();
    }

    // moves the ball
    ball.x += ball.dx;
    ball.y += ball.dy;

    //the computer's paddle movement
    comp.y += ((ball.y - (comp.y + comp.height / 2))) * 0.09;

    // collision detection on paddles
    let player = (ball.x < canvas.width / 2) ? playerOne : comp;
    //player can be either playerOne or the comp since both hit the ball

    if (getDistance(player, ball)) {

        // default angle is 0deg
        let angle = 0;

        // if the ball hits the top of the paddle - it rebounds at an angle
        if (ball.y < (player.y + player.height / 2)) {
            angle = -1 * Math.PI / 4;
        } else if (ball.y > (player.y + player.height / 2)) {
            // if it hits the bottom of the paddle
            angle = Math.PI / 4;
        }

        // changes the VELOCITY of ball according to which paddle the ball hit
        // ball.velocityX = (player === playerOne ? 1 : -1) * ball.speed * Math.cos(angle);
        // ball.velocityY = ball.speed * Math.sin(angle);

        // increases the ball speed
        // ball.speed += 0.2;
    }
}


function render() { //render pushes everything to be displayed

    //the player score
    Score(canvas.width / 4, canvas.height / 6, playerOne.score);

    //the comp score
    Score(3 * canvas.width / 4, canvas.height / 6, comp.score);

    //the player paddle
    drawPaddle(playerOne.x, playerOne.y, playerOne.width, playerOne.height, playerOne.color);

    //the comp paddle
    drawPaddle(comp.x, comp.y, comp.width, comp.height, comp.color);

    //the ball
    drawBall(ball.x, ball.y, ball.radius, ball.color);
}

//this will LOOP? the game 

function gameLoop() {

    update();

    render();
}

gameLoop();

// setInterval(gameLoop, 3000 / 60);