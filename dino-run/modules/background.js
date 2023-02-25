import GameObject from "./gameObject.js";

export default class Background extends GameObject{
    secondarySprite;
    secondaryX;
    constructor(canvas) {
        super(canvas, 0,  136, 1200, 13, false);

        this.setActiveSprite(document.getElementById("background"))
        this.secondarySprite = document.getElementById("background")
        this.secondaryX = this.width;
        this.setVelocity(-5, 0)
    }

    move() {
        super.move()
        this.secondaryX += this.velocity.x;
        if (this.x < -1200) {
            this.x = this.secondaryX + this.width;
        }
        if (this.secondaryX < -1200) {
            this.secondaryX = this.x + this.width;
        }
    }

    draw() {
        super.draw();
        this.canvas.draw(this.secondarySprite, this.secondaryX, this.y, this.width, this.height)
    }
}