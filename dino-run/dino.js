import { createSpriteDefinition, DinoCanvas } from "./dino-canvas";



export default class Dino {
    constructor() {
        this.spriteDefinition = createSpriteDefinition()
        this.canvas = new DinoCanvas()
        this.running = false;
        this.score = 0;
        this.dino = {
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

    }
}


var ground = 80;

var background = {
    x: 0,
    y: ground,
    width: canvasWidth,
    height: ground,
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


function toggleDinoFrame() {
    if (dino.frame === 0) {
        dino.frame = 1;
    } else {
        dino.frame = 0;
    }
}

function draw() {

}

