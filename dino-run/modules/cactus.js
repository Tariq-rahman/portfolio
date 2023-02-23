import GameObject from "./gameObject";

export default class Cactus extends GameObject{
    constructor(canvas) {
        // spawn off canvas
        super(canvas, canvas.canvasWidth,  10, 50, 50, true);

        // consider retrieving the sprite config from separate file
        this.setSprite(86, 2, 50, 50);

        // Set velocity to move left
        this.setVelocity(-5,0)
    }
}