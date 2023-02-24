import Canvas from "./modules/canvas.js";
import Dino from "./modules/dino.js"
import Background from "./modules/background.js";
import Cactus from "./modules/cactus.js";

var game = {
    ctx: null,
    spriteMap: null,
    canvas: null,
    objects: [],
};
var score = 0;
var running = false;

document.getElementById("start").addEventListener("click", start)
document.getElementById("reset").addEventListener("click", reset)

window.addEventListener("load", (event) => {
    let c = document.getElementById("dino-canvas");
    game.ctx = c.getContext("2d");
    game.spriteMap = document.getElementById("sprite-map")
    game.canvas = new Canvas(game.ctx, game.spriteMap);
    let dino = new Dino(game.canvas);
    let background = new Background(game.canvas);
    let cactus = new Cactus(game.canvas, 1)
    game.objects.push(dino, background, cactus)
    dino.draw()
});


// Runs the next tick of the main
function runGame() {
    // will complete tick every 16 milliseconds which translates to 30 fps
    // 32 * 30 = 960 ms
    let gameSpeed = 50

    // Run the main
    setInterval(function () {
        if (running){
            // Check for collisions
            let dino = game.objects[0]
            for (let i =1; i < game.objects.length; i++) {
                if (!game.objects[i].canCollide) {
                    continue;
                }

                if (dino.isCollided(game.objects[i])) {
                    endGame()
                }
            }

            game.canvas.clearCanvas()

            // move and draw all objects
            for (let i =0; i < game.objects.length; i++) {
                game.objects[i].move();
                game.objects[i].draw();

                // Remove enemy objects that have gone off-screen
                if (game.objects[i].canCollide === true && game.objects[i].x < 0) {
                    // Re-spawn new enemy
                    // todo make enemy random
                    let cactus = new Cactus(game.canvas, 1)
                    game.objects.splice(i, 1, cactus)

                }
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

function endGame() {
    running = false;
    alert("you dead!")
}
