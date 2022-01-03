console.log("Ready?")



// =================== CANVAS =================
let canvas = document.querySelector('canvas');

canvas.width = 900;
canvas.height = 750;

let c = canvas.getContext('2d');

window.addEventListener('keydown', (e) => keyDown(e));
window.addEventListener('keyup', (e) => keyUp(e));
// console.log(keyDown)

// ================= PADDLES ==================
let paddleWidth = 15;
let paddleHeight = 175;

class Paddle {
    constructor(x) {
        this.x = x;
        this.y = canvas.height / 2 - paddleHeight / 2; //height will be the height of canvas
        this.height = paddleHeight;
        this.width = paddleWidth;
        this.color = 'black';

        this.isUp = false;
        this.isDown = false;
    }

    display() {
        c.fillStyle = 'black';
        // c.clearRect(0, 0, canvas.width, canvas.height);
        c.fillRect(this.x, this.y, this.width, this.height, this.color);
    }

    up() {
        if (this.y > 0 && canvas.height - this.height) {
            // console.log(this.y);
            // if(this.y < 0 || this.y > )
            this.y = this.y - 8;
        }
        this.display();
    }

    down() {
        if (this.y < canvas.height - paddleHeight) {
            this.y = this.y + 8;
        }
        this.display();
    }

    update() {
        if (this.isUp) {
            this.up();
        }
        
        if (this.isDown) {
            this.down();
        }
        
    }
}

// ========================= BALL =====================

class Ball {
    constructor() {
        this.r = 15;
        this.reset();
        this.color = 'black';
    }

    update() { 
        // for when it hits the top/bottom it changes the direction
        if (this.y < this.r || this.y > canvas.height - this.r) {
            this.dy = -this.dy;
        }
        //when it hits the left/right walls it resets + player score goes up
        if(ball.x + this.r >= canvas.width) {
            playerOne.p1score += 1;
            this.reset();
        }
        if(ball.x - this.r <= 0) {
            compAi.compscore += 1;
            this.reset();
        }

        // this.x += this.dx;
        // this.y += this.dy;
    }

    reset() {
        this.x = canvas.width/2;
        this.y = canvas.height/2;

        this.dx = (Math.random() - 0.5) * 5;

        let isLeft = Math.random(1) > 0.5;
        if(isLeft) {
            this.dx = -this.dx;
        }

        this.dy = (Math.random() - 0.5) * 5;
    }

    display() {
    c.beginPath();
    c.arc(this.x, this.y, this.r, 0, Math.PI * 2, true);
    c.closePath();
    c.fill();
    c.fillStyle = this.color;
    }

    // hitPlayer (playerOne) {
    //     if (this.x - this.r <= playerOne.x + paddleWidth && this.x > playerOne.x){
    //         if (this.sameHeight(playerOne)) {
    //             this.dx = -this.dx;
    //         }
    //     }
    // }

    // hitComp (compAi) {
    //     if (this.x + this.r >= compAi.x && this.x <= compAi.x + compAi.width) {
    //         if(this.sameHeight(compAi)) {
    //             this.dx = -this.dx;
    //         }
    //     }
    // }

    // sameHeight(playerOne) {
    //     return this.y >= playerOne.y && this.y <= playerOne.y + playerOne.height
    // }

}


// =============== GAME SET UP =====================

let playerOne = new Paddle(10);
let compAi = new Paddle(canvas.width - (paddleWidth + 10));
let ball = new Ball();
// playerOne.display(); - sanity check


function keyDown(KeyboardEvent) { //activated when key is pressed
    console.log('KeyboardEvent', KeyboardEvent)
    if (KeyboardEvent.key == 'ArrowUp') {
        playerOne.isUp = true;
        draw();
    }

    if (KeyboardEvent.key == 'ArrowDown') {
        // console.log('going down');
        playerOne.isDown = true;
        draw();
    }
}

function keyUp(KeyboardEvent) { //activates when the key is released/let go/no longer pressed
    if (KeyboardEvent.key == 'ArrowUp') {
        playerOne.isUp = false;
        draw();
    }

    if (KeyboardEvent.key == 'ArrowDown') {
        playerOne.isDown = false;
        draw();
    }
}

playerOne.display();
compAi.display();
ball.display();

function draw() {

    if (playerOne.isUp) {
        c.clearRect(0, 0, innerWidth, innerHeight);
        playerOne.up();
    }
    
    if (playerOne.isDown) {
        c.clearRect(0, 0, innerWidth, innerHeight);
        playerOne.down();
    }

    // moveComp();

    ball.update();

}

function moveComp () {

    let midPaddle = compAi.y + compAi.height / 2;

    if(midPaddle > ball.y) {
        this.up();
    }

    if(midPaddle < ball.y) {
        this.down();
    }
}

draw();
