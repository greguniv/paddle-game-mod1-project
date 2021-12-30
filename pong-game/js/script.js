
console.log("Ready to play?")

// =============================== CANVAS ========================
let canvas = document.querySelector('canvas');
canvas.width = 800;
canvas.height = 750;
// this lets the entire webpage be our canvas

let c = canvas.getContext('2d');
//to draw anything on canvas, we need to getContext

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

// ======================= SOUNDS LIVE HERE =======================
const hitSound = new Audio('./game-sounds/ball-hitting-paddle-sound.wav');
const gainPoint = new Audio('./game-sounds/point-gained-sound.wav');
const loseSound = new Audio('./game-sounds/losing-sound.wav');

// ================== JS FOR THE BALL ===========================


//this sets up how the ball appears
let ball = {
    x: canvas.width / 2,
    y: canvas.height / 2, //this x & y center the ball on the canvas
    radius: 15,
    speed: 5,
    dx: 5,
    dy: 5,
    color: 'black',
}

//this function is for actually making the ball appear on the canvas
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

    ball.dx = -ball.dx; //reverses/changes the direction
    ball.dy = -ball.dy;
}


// ========================= JS FOR THE PADDLES ================
const paddleWidth = 15;
const paddleHeight = 200;

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
// -STRETCH GOAL: use mouse to move the Paddle -

function keyDown(event) { //activated when key is pressed
    switch (event.keyCode) {
        case "ArrowUp":
            upArrowPressed = true;
            break;
        case "ArrowDown":
            downArrowPressed = true;
            break;
    }
}

function keyUp(event) { //activates when the key is released/let go/no longer pressed
    switch (event.code) {
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
        playerOne.y -= 100;
    } else if (downArrowPressed && (playerOne.y < canvas.height - playerOne.height)) {
        playerOne.y += 100;
    }

    // checks if ball hits top or bottom
    if (ball.y + ball.radius >= canvas.height || ball.y - ball.radius <= 0) {
        //sound for losing/reset plays
        loseSound.play();
        ball.dy = -ball.dy;
    }

    // if the ball hits past the right paddle (past the comp)
    if (ball.x + ball.radius >= canvas.width) {
        // play scoreSound
        gainPoint.play();
        // then player scored 1 point!
        playerOne.score += 1;
        reset();
    }

    // if ball hit on left wall
    if (ball.x - ball.radius <= 0) {
        // play scoreSound
        gainPoint.play();
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
    let player = (ball.x < canvas.width / 2) ? playerOne : comp; //player can be either playerOne or the comp since both hit the ball

    if (getDistance(player, ball)) {
        // plays hitSound
        hitSound.play();
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
        ball.velocityX = (player === playerOne ? 1 : -1) * ball.speed * Math.cos(angle);
        ball.velocityY = ball.speed * Math.sin(angle);

        // increases the ball speed
        ball.speed += 0.2;
    }
}


function render() { //render pushes everything onto the webpage to be displayed
    c.fillRect(0, 0, canvas.width, canvas.height);

    // draws user score
    Score(canvas.width / 4, canvas.height / 6, playerOne.score);

    // draws the comp score
    Score(3 * canvas.width / 4, canvas.height / 6, comp.score);

    // draws the player paddle
    drawPaddle(playerOne.x, playerOne.y, playerOne.width, playerOne.height, playerOne.color);

    // draws the comp paddle
    drawPaddle(comp.x, comp.y, comp.width, comp.height, comp.color);

    // draws the ball
    drawBall(ball.x, ball.y, ball.radius, ball.color);
}

//this will LOOP? the game 

function gameLoop() {
    render();

    update();
}


gameLoop();