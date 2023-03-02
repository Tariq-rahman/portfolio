export default class GameObject {
    // Fields
    activeSprite;
    animationSprites = [];
    animationFrame = 0;
    animation = false;
    animationDelay = 0;
    animationDelayCoefficient = 10;
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

    // Sets the animation sprites
    setAnimationSprites(animSprites) {
        this.animationSprites = animSprites;
    }

    // Set the given sprite as the active sprite. The active sprite is what is drawn by the draw function
    setActiveSprite(sprite) {
        this.activeSprite = sprite
    }

    isCollided(gameObject, xLeniency = 0, yLeniency = 0) {
        let xDiff = Math.abs(gameObject.x - this.x) + xLeniency
        let yDiff = Math.abs(gameObject.y - this.y) + yLeniency

        return xDiff < this.width && yDiff < this.height;
    }

    // Set the velocity
    setVelocity(x, y) {
        this.velocity.x = x;
        this.velocity.y = y;
    }

    // move() will move the gameObject based on its current veloctity
    move() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
    }

    // animate() will change to the next animation sprite if the animation delay allows it
    // The animation delay is there to prevent the sprites changing every frame and is relative on the FPS.
    // animate() will not do anything if the gameObject.animation property is not set to true
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

        this.animationDelay = this.FPS / (this.animationSprites.length + this.animationDelayCoefficient);
    }

    // animateNow() will instantly switch to the next animation frame
    // This is used as part of animate() and is also useful for instantly switching to
    // the next animation frame. For example doing an attack animation on key press.
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

    // The update function is what will be called by the game controller every frame
    update() {
        this.move();
        this.animate();
        this.draw();
    }
}