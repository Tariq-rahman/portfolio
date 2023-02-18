// todo make this a class and privatise variables
var c = document.getElementById("dino-canvas");
var ctx = c.getContext("2d");
var running = false;
var score = 0;
var canvasHeight = 150;
var canvasWidth = 600;
var ground = 50;
var jumpSpeed = 5;
var dino = {
    x: 0,
    y: ground,
    width: 80,
    height: 80,
    verticalVelocity: 0,
}

var dinoImage = document.getElementById("dino")

ctx.drawImage(dinoImage,dino.x,dino.y, dino.width,dino.height)


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
    if (dino.verticalVelocity > 0) {
        dino.y = dino.y - jumpSpeed;
        dino.verticalVelocity--
    } else if (dino.y < ground){
        dino.y = dino.y + jumpSpeed;
    }
}

function jump() {
    // Can only jump if dino is on the ground
    if (dino.y === ground) {
        document.getElementById("jump-sound").play()
        dino.verticalVelocity = 10;
    }
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
    ctx.clearRect(0 ,0, canvasWidth, canvasHeight)
}

function drawDino() {
    ctx.drawImage(dinoImage,dino.x,dino.y, dino.width,dino.height)
}

function drawCacti() {
    
}

function drawBackground() {

}

function drawBirds() {
    
}

function drawScore() {

}

