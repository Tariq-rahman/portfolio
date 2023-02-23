import GameObject from "./gameObject.js";

export default class Background extends GameObject{
    spriteX;
    maxSpriteWidth = 600; // todo move this elsewhere

    constructor(canvas) {
        super(canvas, 0,  20, 0, 0, true);

        // consider retrieving the sprite config from separate file
        this.spriteX = 0;
        this.setSprite(this.spriteX, 100, this.canvas.canvasWidth, 50)
    }

    // Override move as we don't want the background to move
    // rather we want to move where we source the image from
    move() {
        this.spriteX += 5;

        if (this.spriteX > this.maxSpriteWidth) {
            this.spriteX = 0;
        }

        this.setSprite(this.spriteX, this.activeSprite.y, this.activeSprite.w, this.activeSprite.h)

    }
}