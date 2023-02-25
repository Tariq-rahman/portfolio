import Canvas from "./modules/canvas.js";
import Dino from "./modules/dino.js"
import Background from "./modules/background.js";
import Cactus from "./modules/cactus.js";
import Cloud from "./modules/cloud.js";
import Bird from "./modules/bird.js";
import Score from "./modules/score.js";

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
    let cloud = new Cloud(game.canvas)
    let cactus = new Cactus(game.canvas, 1)
    let bird = new Bird(game.canvas)
    let score = new Score(game.canvas)
    // Dino and cactus always last. So, they are drawn on top of background
    game.objects.push(background, cloud, score, cactus, bird, dino)
    dino.draw()
});


// Runs the next tick of the main
function runGame() {
    // will complete tick every 16 milliseconds which translates to 60 fps
    // 16 * 60 = 960 ms
    let gameSpeed = 16

    // Run the main
    setInterval(function () {
        if (running){
            // Check for collisions
            let dino = game.objects[game.objects.length - 1]
            for (let i =0; i < game.objects.length -1; i++) {
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
                game.objects[i].update()

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
