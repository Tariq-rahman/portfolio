import Canvas from "./modules/canvas";
import Dino from "./modules/dino"

var main

var running = false;

window.addEventListener("load", (event) => {
    let c = document.getElementById("dino-canvas");
    main.ctx = c.getContext("2d");
    main.spriteMap = document.getElementById("sprite-map")
    main.dinoCanvas = new Canvas(ctx, main.spriteMap)
    let dino = new Dino()
    main.objects = [];
    main.objects.push(dino)
    dino.draw()
});


// Runs the next tick of the main
function runGame() {
    // will complete tick every 16 milliseconds which translates to 60 fps
    // 16 * 60 = 960 ms
    let gameSpeed = 50

    // Run the main
    setInterval(function () {
        if (running){
            main.dinoCanvas.clearCanvas()
            for (let i =0; i < main.objects.length; i++) {
                main.objects[i].move();
                main.objects[i].draw();

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
