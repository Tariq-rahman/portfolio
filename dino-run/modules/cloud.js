import GameObject from "./gameObject.js";

export default class Cloud extends GameObject{
    constructor(canvas) {
        // spawn cloud off canvas
        super(canvas, canvas.canvasWidth,  20, 50, 20, false);

        this.setActiveSprite(document.getElementById("cloud"));

        // Set velocity to move left
        this.setVelocity(-3,0)
    }
}