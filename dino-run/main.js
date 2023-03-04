import Canvas from "./modules/canvas.js";
import Dino from "./modules/dino.js"
import Background from "./modules/background.js";
import Score from "./modules/score.js";
import GameObject from "./modules/gameObject.js";
import HighScore from "./modules/high-score.js";
import CloudController from "./modules/cloudController.js";
import EnemyController from "./modules/enemyController.js";

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
    cloudController: [],
    enemyController: [],
    background: null,
    dino: null,
    score: null,
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
    for (let i = 0; i < game.enemyController.gameObjects.length; i++) {
        if (game.dino.isCollided(game.enemyController.gameObjects[i], 7, 7)) {
            game.dino.die()
            endGame()
            break;
        }
    }

    game.canvas.clearCanvas()
    game.background.update()
    game.cloudController.update()
    game.enemyController.update()
    game.score.update()
    game.dino.update()

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
    game.cloudController = [];
    game.enemyController = [];

    let dino = new Dino(game.canvas);
    let background = new Background(game.canvas);
    let cloudController = new CloudController(game.canvas)
    let enemyController = new EnemyController(game.canvas)
    let score = new Score(game.canvas)

    cloudController.spawn()
    enemyController.spawn()

    game.background = background;
    game.score = score;
    game.dino = dino;
    game.cloudController = cloudController;
    game.enemyController = enemyController;

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
    let highScore = new HighScore(game.canvas, game.score)
    gameOver.setActiveSprite(document.getElementById("game-over"))
    restart.setActiveSprite(document.getElementById("restart"))

    gameOver.draw()
    restart.draw()
    highScore.draw()
}
