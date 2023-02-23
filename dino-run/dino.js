import { createSpriteDefinition, DinoCanvas } from "./dino-canvas";

import GameObject from "./gameObject";

export default class Dino extends GameObject{
    jumpSpeed= 10;
    frame=  0;
    constructor(canvas) {
        super(canvas, 0,  80, 40, 50, true);

        // consider retrieving the sprite config from separate file
        this.setSprite(1678, 2, 85, 100);
    }


    move() {
        if (dino.verticalVelocity > 0) {
            dino.y = dino.y - dino.jumpSpeed;
            dino.verticalVelocity--
        } else if (dino.y < ground){
            dino.y = dino.y + dino.jumpSpeed;
        }
    }


    jump() {
        // Can only jump if dino is on the ground
        if (dino.y === ground) {
            document.getElementById("jump-sound").play()
            // The vertical velocity
            dino.verticalVelocity = 5;
        }
    }


    duck() {

    }

    toggleDinoFrame() {
        if (dino.frame === 0) {
            dino.frame = 1;
        } else {
            dino.frame = 0;
        }
    }

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
