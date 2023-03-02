import Cloud from "./cloud.js";

export default class CloudController {
    clouds = [];
    minX = 600;
    maxX = 1800;
    minY = 5;
    maxY = 60;
    maxClouds = 4;
    canvas;

    constructor(canvas) {
        this.canvas = canvas;
    }

    generateRandomPosition() {
        let pos = {
            x: 0,
            y: 0,
        }

        pos.x = Math.floor(Math.random() * (this.maxX - this.minX)) + this.minX // generates a random number between 600 ~ 1200
        pos.y = Math.floor(Math.random() * (this.maxY - this.minY)) + this.minY // rand num between min y and max y

        return pos;
    }

    checkOverlap(pos) {
        for (let i = 0; i < this.clouds.length; i++) {

            if (this.clouds[i].isCollided(pos)) {
                return true;
            }
        }

        return false;
    }

    randomisePosition() {
        let pos = this.generateRandomPosition();
        for (let i = 0; i < 10; i++) {
            if (!this.checkOverlap(pos)) {
                break;
            }

            pos = this.generateRandomPosition()
        }

        return pos;
    }

    new() {
        const c = new Cloud(this.canvas)
        let randPos = this.randomisePosition()
        c.x = randPos.x;
        c.y = randPos.y;

        if (this.clouds.length === this.maxClouds) {
            this.clouds.shift()
        }

        this.clouds.push(c)
    }

    // Spawn a given number of clouds. Cannot be greater than maxClouds
    // If it is, it will be overwritten
    spawn(num) {
        if (num > this.maxClouds) {
           num = this.maxClouds
        }

        for (let i = 0; i < num; i++) {
            this.new()
        }
    }

    update() {
        for ( let i = 0; i < this.clouds.length; i++) {
            this.clouds[i].update()

            if (this.clouds[i].x < 0 - this.clouds[i].width) {
                // Delete cloud that's gone off-screen
                this.clouds.splice(i, 1)
                // Create new cloud
                this.new();
            }
        }
    }
}