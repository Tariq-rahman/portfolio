export default class GameObject {
    // Fields
    activeSprite;
    animationSprites = [];
    animationFrame = 0;
    animation = false;
    animationDelay = 0;
    FPS = 60;
    canvas;
    x;
    y;
    width;
    height;
    canCollide;
    velocity;

    constructor(canvas, x, y, width, height, collision) {
        this.canvas = canvas
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canCollide = collision
        this.velocity = {
            x: 0,
            y: 0,
        }
    }

    setAnimationSprites(animSprites) {
        this.animationSprites = animSprites;
    }

    setActiveSprite(sprite) {
        this.activeSprite = sprite
    }

    isCollided(gameObject) {
        if (this.canCollide === false) {
            return false;
        }

        // x plane collision
        let xPlane = false
        if (
            (this.x >= gameObject.x && this.x < gameObject.x + gameObject.width)
            || (this.x + this.width > gameObject.x && this.x < gameObject.x)
        ) {
            xPlane = true
        }

        // y plane collision
        let yPlane = false
        if (
            (this.y >= gameObject.y && this.y < gameObject.y + gameObject.height)
            || (this.y + this.height > gameObject.y && this.y < gameObject.y)
        ) {
            yPlane = true
        }

        return xPlane && yPlane;
    }

    setVelocity(x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    }

    move() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    animate() {
        // Check if object can perform animation
        if (this.animationSprites.length === 0 || !this.animation) {
            return
        }

        // Check we are still waiting for last animation to finish
        if (this.animationDelay > 0) {
            this.animationDelay--
            return
        }

        this.animateNow()

        this.animationDelay = this.FPS / (this.animationSprites.length + 10);
    }

    animateNow() {
        // Perform the animation
        this.setActiveSprite(this.animationSprites[this.animationFrame])
        this.animationFrame++;

        if (this.animationFrame > (this.animationSprites.length -1)) {
            this.animationFrame = 0;
        }
    }

    // draw self on the canvas
    draw() {
        this.canvas.quickDraw(this.activeSprite, this)
    }

    update() {
        this.move();
        this.animate();
        this.draw();
    }
}