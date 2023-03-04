import {randomisePosition} from './spawner.js'
import Bird from "./bird.js";
import Cactus from "./cactus.js";

export default class EnemyController {
    birdConfig = {
        minX: 600,
        maxX: 1800,
        minY: 20,
        maxY: 80,
        maxObjects: 1,
    }
    cactusConfig = {
        minX: 600,
        maxX: 1800,
        minY: 102,
        maxY: 105,
        maxObjects: 1,
    }

    gameObjects = [];
    canvas;

    constructor(canvas) {
        this.canvas = canvas
    }

    newBird() {
        const b = new Bird(this.canvas)
        let randPos = randomisePosition(this.birdConfig, b, this.gameObjects)

        b.x = randPos.x;
        b.y = randPos.y;

        return b;
    }

    newCacti() {
        // Get a random type from the cactus type map
        let type = Math.floor(Math.random() * Object.keys(Cactus.typeMap).length) + 1

        const c = new Cactus(this.canvas, type)
        let randPos = randomisePosition(this.cactusConfig, c, this.gameObjects)

        c.x = randPos.x;
        c.y = randPos.y;

        return c;
    }

    spawn() {
        for (let i = 0; i < this.cactusConfig.maxObjects; i++) {
            let c = this.newCacti()
            this.gameObjects.push(c)
        }

        for (let i = 0; i < this.birdConfig.maxObjects; i++) {
            let b = this.newBird();
            this.gameObjects.push(b)
        }
    }

    // todo consider factory pattern here
    respawn(object) {
        let className = object.constructor.name
        let enemy;

        if (className.toString() === "Cactus") {
            enemy = this.newCacti()
        }

        if (className.toString() === "Bird") {
            enemy = this.newBird()
        }

        return enemy;
    }

    update() {
        for (let i = 0; i < this.gameObjects.length; i++) {
            this.gameObjects[i].update()

            if (this.gameObjects[i].x < 0 - this.gameObjects[i].width) {

                // Create gameObject
                let enemy = this.respawn(this.gameObjects[i])

                // Replace game object that's gone off-screen
                this.gameObjects.splice(i, 1, enemy)
            }
        }
    }

    increaseDifficulty() {

    }
}