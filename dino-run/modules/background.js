import GameObject from "./gameObject.js";

export default class Background extends GameObject{
    constructor(canvas) {
        super(canvas, 0,  120, 1800, 20, false);

        this.setActiveSprite(document.getElementById("background"))
        this.setVelocity(-15, 0)
    }

    move() {
        super.move()
        if (this.x < -1200) {
            this.x = 0;
        }

    }
}