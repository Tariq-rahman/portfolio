import Canvas from "./modules/canvas.js";
import Dino from "./modules/dino.js"
import Background from "./modules/background.js";
import Cactus from "./modules/cactus.js";
import Cloud from "./modules/cloud.js";
import Bird from "./modules/bird.js";
import Score from "./modules/score.js";
import GameObject from "./modules/gameObject.js";
import HighScore from "./modules/high-score.js";

var config = {
    gameOver: {
        x: 205,
        y: 40,
        width: 190.5,
        height: 10.5,
        collision: false,
    },
    restart: {
        x: 282,
        y: 65,
        width: 36,
        height: 32,
        collision: false,
    }
}

var game = {
    ctx: null,
    spriteMap: null,
    canvas: null,
    objects: [],
};
var gameStarted = false;
var intervalID;

document.getElementById("start").addEventListener("click", start)
document.addEventListener("keydown", (event) => {
    if (gameStarted) {
        return
    }

    if (event.code === "Space" || event.code === "ArrowUp") {
         let button = document.getElementById("start")
        button.click();
    }
})

window.addEventListener("load", (event) => {
    let c = document.getElementById("dino-canvas");
    game.ctx = c.getContext("2d");
    game.canvas = new Canvas(game.ctx);

    let dino = new Dino(game.canvas);
    dino.draw()
});

// Runs the next tick of the game
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
            break;
        }
    }
    game.canvas.clearCanvas()

    // move and draw all objects
    for (let i =0; i < game.objects.length; i++) {
        game.objects[i].update()

        // Remove enemy objects that have gone off-screen
        if (game.objects[i].canCollide === true && game.objects[i].x < 0) {
            let enemyClass = game.objects[i].constructor.name

            let enemy;
            if (enemyClass.toString() === "Cactus") {
                enemy = new Cactus(game.canvas, 1)
            }

            if (enemyClass.toString() === "Bird") {
                enemy = new Bird(game.canvas)
            }

            // todo make enemy random
            game.objects.splice(i, 1, enemy)

        }
    }

    if (!gameStarted) {
        drawGameOverScreen()
    }
}

///////////////////////
// Buttons functions //
///////////////////////

// Start the game. Also does the reset functionality
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
    game.objects.push(background, cloud, score, bird, cactus, dino)

    runGame()
    document.getElementById("start").blur();
}

function endGame() {
    gameStarted = false;
    // clear the interval function
    clearInterval(intervalID)
}

function drawGameOverScreen() {
    let gameOver = new GameObject(game.canvas,config.gameOver.x, config.gameOver.y, config.gameOver.width, config.gameOver.height, config.gameOver.collision)
    let restart = new GameObject(game.canvas,config.restart.x, config.restart.y, config.restart.width, config.restart.height, config.restart.collision)
    let highScore = new HighScore(game.canvas, getScore())
    gameOver.setActiveSprite(document.getElementById("game-over"))
    restart.setActiveSprite(document.getElementById("restart"))

    gameOver.draw()
    restart.draw()
    highScore.draw()
}

function getScore() {
    for (let i = 0; i < game.objects.length; i++) {
        let className = game.objects[i].constructor.name
        if (className === 'Score') {
            return game.objects[i].score;
        }
    }

    throw("Score has not been initialised!");
}
