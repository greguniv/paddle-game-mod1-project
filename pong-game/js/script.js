// =================== DOM QUERIES UP HERE ======================

console.log("Ready to play?")

// =============================== CANVAS ========================
const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
// this lets the entire webpage be our canvas
const c = canvas.getContext('2d');
//to draw anything on canvas, we need to getContext

// ======================= SOUNDS LIVE HERE =======================
const hitSound = new Audio('./game-sounds/ball-hitting-paddle-sound.wav');
const gainPoint = new Audio('./game-sounds/point-gained-sound.wav');
const loseSound = new Audio('./game-sounds/losing-sound.wav');
const winnerSound = new Audio('./game-sounds/you-won-sound.wav');

// ================== JS FOR THE BALL ===========================


//this creates the ball
let radius = 15;

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = 'black';
        c.stroke();
        c.fillStyle = 'black';
        c.fill();
    }

    this.update = function () {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }

        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

console.log()

// ================ THIS IS THE JS FOR THE PADDLES ==================

const paddleWidth = 10;
const paddleHeight = 100;

const playerOne = {
    x: 10,
    y: canvas.height / 2 - paddleHeight / 2,
    width: paddleWidth,
    height: paddleHeight,
    color: 'pink',
    score: 0
};