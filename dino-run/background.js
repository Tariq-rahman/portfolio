import GameObject from "./gameObject";

export default class Bird {
    constructor(canvas) {
        this.canvas = canvas
        // spawn off canvas
        this.gameObject = new GameObject(this.canvas.canvasWidth,  20, 50, 50, true)

        // consider retrieving the sprite config from separate file
        this.sprite = { x: 86, y: 2, width: 0, height: 0}

        // Set velocity to move left
        this.gameObject.setVelocity(-5,0)
    }

    // draw self on the canvas
    draw() {
        this.canvas.quickDraw(this.sprite, this.gameObject)
    }

    // move position leftwards to implement movement
    move() {
        this.gameObject.move();
    }

    checkCollision(obj) {
        this.gameObject.isCollided(obj)
    }
}