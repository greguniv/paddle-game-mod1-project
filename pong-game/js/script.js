// =================== DOM QUERIES UP HERE ======================



console.log("Ready to play?")

// =============== CANVAS =========
let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let c = canvas.getContext('2d');

// ================== JS FOR THE BALL ==========================

//this creates the ball
c.beginPath();
c.arc(300, 300, 15, 0, Math.PI * 2, false);
c.strokeStyle = "blue";
c.stroke();
c.fillStyle = "blue";
c.fill();

//this js is to have it bounce around the canvas
function animate() {
    requestAnimationFrame(animate);
}

animate();

// ============== THIS IS THE JS FOR THE INTERACTION FOR THE BALL ============

let mouse = {
    x: undefined,
    y: undefined
}
//this js below tracks where the mouse is on the canvas
window.addEventListener('mousemove',
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
        console.log(mouse)
    })