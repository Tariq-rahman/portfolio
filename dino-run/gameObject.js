export default class GameObject {
    // Fields
    activeSprite;
    animationSprites = [];
    animationFrame = 0;
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
        this.activeSprite = { x: 0, y: 0, width: 0, height: 0} // will be overridden by subclass
    }

    setAnimationSprite(sprite) {
        if (this.validateSprite(sprite)) {
            this.animationSprites.push(sprite)
        }
    }

    validateSprite(sprite) {
        if (!sprite.hasOwnProperty("x")) {
            throw("Sprite is missing x property")
        }

        if (!sprite.hasOwnProperty("y")) {
            throw("Sprite is missing y property")
        }

        if ( !sprite.hasOwnProperty("width")) {
            throw("Sprite is missing width property!")
        }

        if (!sprite.hasOwnProperty("height")) {
            throw("Sprite is missing width property!")
        }

        return true;
    }

    setSprite(sprite) {
        if (this.validateSprite(sprite)) {
            this.activeSprite = sprite
        }
    }

    isCollided(gameObject) {
        if (this.canCollide === false) {
            return false;
        }

        // x plane collision
        let xPlane = false
        if (
            (this.x >= gameObject.x && this.x <= gameObject.x + unitSize)
            || (this.x + unitSize >= gameObject.x && this.x <= gameObject.x)
        ) {
            xPlane = true
        }

        // y plane collision
        let yPlane = false
        if (
            (this.y >= gameObject.y && this.y <= gameObject.y + unitSize)
            || (this.y + unitSize >= gameObject.y && this.y <= gameObject.y)
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
        this.animate();
    }

    animate() {
        this.setSprite(this.animationSprites[this.animationFrame])
        this.animationFrame++;

        if (this.animationFrame > (this.animationSprites.length -1)) {
            this.animationFrame = 0;
        }
    }
    
    // draw self on the canvas
    draw() {
        this.canvas.quickDraw(this.activeSprite, this)
    }
}