import { createSpriteDefinition, DinoCanvas} from "./dino-canvas";
import Dino from "./dino"

window.addEventListener("load", (event) => {
    setup()
});

var running = false;

function setup() {
    let c = document.getElementById("dino-canvas");
    let ctx = c.getContext("2d");
    let spriteMap = document.getElementById("sprite-map")
    let spriteDefinition = createSpriteDefinition()
    let dinoCanvas = new DinoCanvas(ctx, spriteMap, spriteDefinition)
    let dino = new Dino()
}

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
        if (running){
            clearCanvas()
            moveDino()
            drawDino()
            drawBackground()
            drawCacti()
            drawBirds()
            drawScore()
        }
    }, gameSpeed)
}

///////////////////////
// Buttons functions //
///////////////////////

// Start the game
function start() {
    if (!running) {
        running = true
        runGame()
    }
    // change the start button text to "pause"
    // start button will then function as both pause and start depending on state of game
}

// Reset the game
function reset() {
    running = false;
    score = 0;
}
