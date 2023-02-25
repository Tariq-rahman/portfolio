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
var gameStarted = false;
var intervalID;

document.getElementById("start").addEventListener("click", start)

window.addEventListener("load", (event) => {
    setup()
});

function setup() {
    let c = document.getElementById("dino-canvas");
    game.ctx = c.getContext("2d");
    game.canvas = new Canvas(game.ctx);

    let dino = new Dino(game.canvas);
    dino.draw()
}


// Runs the next tick of the main
function runGame() {
    // will complete tick every 16 milliseconds which translates to 60 fps
    // 16 * 60 = 960 ms
    intervalID =  setInterval(function () {
        update()
    }, 16)
}

function update() {
    // Check for collisions
    let dino = game.objects[game.objects.length - 1]
    for (let i =0; i < game.objects.length -1; i++) {
        if (!game.objects[i].canCollide) {
            continue;
        }

        if (dino.isCollided(game.objects[i])) {
            dino.die()
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

///////////////////////
// Buttons functions //
///////////////////////

// Start the main
function start() {
    if (gameStarted) {
        return;
    }

    gameStarted = true;
    game.objects = [];
    let dino = new Dino(game.canvas);
    let background = new Background(game.canvas);
    let cloud = new Cloud(game.canvas)
    let cactus = new Cactus(game.canvas, 1)
    let bird = new Bird(game.canvas)
    let score = new Score(game.canvas)

    // Dino and cactus always last. So, they are drawn on top of background
    game.objects.push(background, cloud, score, cactus, bird, dino)

    runGame()
}

function endGame() {
    gameStarted = false;
    // clear the interval function
    clearInterval(intervalID)
}
