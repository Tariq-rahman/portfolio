export default class GameObject {
    constructor(x, y, width, height, collision) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.collision = collision
        this.velocity = {
            x: 0,
            y: 0,
        }
    }

    isCollided(gameObject) {
        if (this.collision === false) {
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
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }
}