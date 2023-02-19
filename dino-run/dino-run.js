// todo make this a class and privatise variables
var c = document.getElementById("dino-canvas");
var ctx = c.getContext("2d");
var running = false;
var score = 0;
var canvasHeight = 150;
var canvasWidth = 600;
var ground = 80;
var dino = {
    x: 0,
    y: ground,
    width: 40,
    height: 50,
    // Vertical velocity is the number ticks the dino will travel vertically before it starts to come down
    verticalVelocity: 0,
    // jumpSpeed is the number of pixels the dino will vertically travel per game tick
    jumpSpeed: 10,
    frame: 0
}

var spriteDefinition = {
    CACTUS_LARGE: { x: 332, y: 2, width: 0, height: 0},
    CACTUS_SMALL: { x: 228, y: 2, width: 0, height: 0 },
    CLOUD: { x: 86, y: 2, width: 0, height: 0 },
    HORIZON: { x: 2, y: 54, width: 600, height: 0 },
    MOON: { x: 484, y: 2, width: 0, height: 0 },
    PTERODACTYL: { x: 134, y: 2, width: 0, height: 0 },
    RESTART: { x: 2, y: 2, width: 0, height: 0 },
    TEXT_SPRITE: { x: 655, y: 2, width: 0, height: 0 },
    DINO: { x: 1678, y: 2, width: 85, height: 100 },
    DINO_RUNNING: [
        { x: 1851, y: 2, width: 88, height: 100 },
        { x: 1938, y: 2, width: 88, height: 100 }
        ],
    DINO_DUCKING_1: {x: 0, y: 0, width: 0, height: 0},
    DINO_DUCKING_2: {x: 0, y: 0, width: 0, height: 0},
    DINO_DEAD:  {x: 0, y: 0, width: 0, height: 0},
    STAR: { x: 645, y: 2, width: 0, height: 0 }
}

var SPRITE_MAP = document.getElementById("sprite-map")

ctx.drawImage(
    SPRITE_MAP,
    spriteDefinition.DINO.x,
    spriteDefinition.DINO.y,
    spriteDefinition.DINO.width,
    spriteDefinition.DINO.height,
    dino.x,
    dino.y,
    dino.width,
    dino.height
);

////////////////////
// Game functions //
////////////////////

// Runs the next tick of the game
function runGame() {
    // will complete tick every 16 milliseconds which translates to 60 fps
    // 16 * 60 = 960 ms
    let gameSpeed = 50

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
        dino.y = dino.y - dino.jumpSpeed;
        dino.verticalVelocity--
    } else if (dino.y < ground){
        dino.y = dino.y + dino.jumpSpeed;
    }
}

function jump() {
    // Can only jump if dino is on the ground
    if (dino.y === ground) {
        document.getElementById("jump-sound").play()
        // The vertical velocity
        dino.verticalVelocity = 5;
    }
}

function duck() {

}

function isCollided() {

}

function toggleDinoFrame() {
    if (dino.frame === 0) {
        dino.frame = 1;
    } else {
        dino.frame = 0;
    }
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
   if (dino.y === ground) {
       ctx.drawImage(
           SPRITE_MAP,
           spriteDefinition.DINO_RUNNING[dino.frame].x,
           spriteDefinition.DINO_RUNNING[dino.frame].y,
           spriteDefinition.DINO_RUNNING[dino.frame].width,
           spriteDefinition.DINO_RUNNING[dino.frame].height,
           dino.x,
           dino.y,
           dino.width,
           dino.height
       );

       toggleDinoFrame()
   } else {
       ctx.drawImage(
           SPRITE_MAP,
           spriteDefinition.DINO.x,
           spriteDefinition.DINO.y,
           spriteDefinition.DINO.width,
           spriteDefinition.DINO.height,
           dino.x,
           dino.y,
           dino.width,
           dino.height
       );
   }
}

function drawCacti() {
    
}

function drawBackground() {

}

function drawBirds() {
    
}

function drawScore() {

}

