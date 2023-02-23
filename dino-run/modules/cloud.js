import GameObject from "./gameObject.js";

export default class Cloud extends GameObject{
    constructor(canvas) {
        // spawn cloud off canvas
        super(canvas, canvas.canvasWidth,  50, 50, 50, false);

        // consider retrieving the sprite config from separate file
        this.setSprite(86, 2, 50, 50);

        // Set velocity to move left
        this.setVelocity(-5,0)
    }
}