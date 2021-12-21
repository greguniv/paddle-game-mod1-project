// =================== DOM QUERIES UP HERE ======================



console.log("Ready to play?")

// ===============  ADD NAMES FOR PLAYER 1 AND PLAYER 2? =========



// element.getBoundingClientRect will help for ball movement

// =============== EXPERIMENTING WITH NEW FUNCTIONS HERE =========
let initial_ball = document.querySelector('.ball');
let ball = document.querySelector('.ball')
let initial_ball_coord = ball.getBoundingClientRect();
let ball_coord = initial_ball_coord;

//parameters for ball movement
let dx = Math.floor(Math.Random() * 4) + 3;
let dy = Math.floor(Math.Random() * 4) + 3;
let dxd = Math.floor(Math.Random() * 2);
let dyd = Math.floor(Math.Random() * 2);

