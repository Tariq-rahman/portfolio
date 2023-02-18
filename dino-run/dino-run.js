var c = document.getElementById("dino-canvas");
var ctx = c.getContext("2d");
var running = false;
var score = 0;

var dino = {
    x: 0,
    y: 50,
    width: 80,
    height: 80,
}


let dinoImage = document.getElementById("dino")

ctx.drawImage(dinoImage,dino.x,dino.y, dino.width,dino.height)
console.log("drawn")



////////////////////
// Game functions //
////////////////////

// Runs the next tick of the game
function runGame() {
    // will complete tick every 16 milliseconds which translates to 60 fps
    // 16 * 60 = 960 ms
    let gameSpeed = 16

    // set up listeners
    document.addEventListener("keydown", (event) => {
        switch (event.key) {
            case "ArrowUp":
                jump()
                console.log("up")
                break;
            case "ArrowDown":
                duck()
                console.log("down")
                break;
            case "Space":
                jump()
                console.log("space")
                break;
        }
    });

    // Run the game
    setInterval(function () {
        clearCanvas()
        moveDino()
        drawDino()
        drawBackground()
        drawCacti()
        drawBirds()
        drawScore()
    }, gameSpeed)
}

function moveDino() {

}

function jump() {

}

function duck() {

}

function isCollided() {

}


///////////////////////
// Buttons functions //
///////////////////////

// Start the game
function start() {
    runGame()
}

// Pause the game
function pause() {
    running = false;
}   

// Reset the game
function reset() {
    running = true;
    score = 0;
}

//////////////////////////////
// Canvas drawing functions //
//////////////////////////////


function clearCanvas() {
    
}

function drawDino() {
    
}

function drawCacti() {
    
}

function drawBackground() {

}

function drawBirds() {
    
}

function drawScore() {

}

