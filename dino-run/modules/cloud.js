import GameObject from "./gameObject.js";

export default class Cloud extends GameObject{
    speed = 5;
    FPS = 60;
    deltaTime;
    constructor(canvas) {
        // spawn cloud off canvas
        super(canvas, canvas.canvasWidth,  20, 50, 20, false);

        this.setActiveSprite(document.getElementById("cloud"));

        // Set velocity to move left
        this.setVelocity(-3,0)
    }

    move() {
        // this.x -= Math.floor((this.speed * this.FPS / 1000) * this.deltaTime);

        super.move();
        if (this.x < 0 - this.width) {
            this.x = 600;
        }
    }
}