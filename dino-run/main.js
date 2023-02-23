import Canvas from "./modules/canvas.js";
import Dino from "./modules/dino.js"

var game;
var score = 0;
var running = false;

window.addEventListener("load", (event) => {
    let c = document.getElementById("dino-canvas");
    game.ctx = c.getContext("2d");
    game.spriteMap = document.getElementById("sprite-map")
    game.dinoCanvas = new Canvas(ctx, game.spriteMap)
    let dino = new Dino()
    game.objects = [];
    game.objects.push(dino)
    dino.draw()
});


// Runs the next tick of the main
function runGame() {
    // will complete tick every 16 milliseconds which translates to 30 fps
    // 32 * 30 = 960 ms
    let gameSpeed = 32

    // Run the main
    setInterval(function () {
        if (running){
            game.dinoCanvas.clearCanvas()
            for (let i =0; i < game.objects.length; i++) {
                game.objects[i].move();
                game.objects[i].draw();

            }
        }
    }, gameSpeed)
}

///////////////////////
// Buttons functions //
///////////////////////

// Start the main
function start() {
    if (!running) {
        running = true
        runGame()
    }
    // change the start button text to "pause"
    // start button will then function as both pause and start depending on state of main
}

// Reset the main
function reset() {
    running = false;
    score = 0;
}
