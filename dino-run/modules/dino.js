import GameObject from "./gameObject.js";

export default class Dino extends GameObject {

    runningSprites = [];
    duckingRunningSprites = [];
    ground = 90;
    maxJumpHeight = 20;

    constructor(canvas) {
        super(canvas, 10,  0, 40, 50, true);
        this.y = this.ground;

        this.setActiveSprite(document.getElementById("dino-run-1"));

        this.runningSprites.push(document.getElementById("dino-run-1"))
        this.runningSprites.push(document.getElementById("dino-run-2"))

        this.duckingRunningSprites.push(document.getElementById("dino-duck-1"))
        this.duckingRunningSprites.push(document.getElementById("dino-duck-2"))

        this.setAnimationSprites(this.runningSprites)

        this.animation = true;

        // set up listeners
        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    this.jump()
                    console.log("up")
                    break;
                case "ArrowDown":
                    this.duck()
                    console.log("down")
                    break;
                case "Space":
                    this.jump()
                    console.log("space")
                    break;
            }
        });


        document.addEventListener("keyup", (event) => {
            switch (event.key) {
                case "ArrowDown":
                    this.unDuck()
                    break;
            }
        })
    }


    move() {
        super.move();

        if (this.y < this.maxJumpHeight) {
           this.setVelocity(0, +15)
        }

        if (this.y === this.ground && this.velocity.y !== 0) {
           this.setVelocity(0, 0)
            this.animation = true;
       }
    }


    jump() {
        // Can only jump if dino is on the ground. 80 is ground
        if (this.y === this.ground) {
            this.animation = false;
            document.getElementById("jump-sound").play()
            // The vertical velocity
            this.setVelocity(0, -15);
        }
    }

    duck() {
        // can only duck on ground
        if (this.y === this.ground) {
            this.setAnimationSprites(this.duckingRunningSprites)
            // set height
            this.width = 60;
            this.height = 40;
            this.y = 90;
        }
    }

    unDuck() {
        if (this.y === this.ground) {
            this.setAnimationSprites(this.runningSprites)
            // set height
            this.width = 40;
            this.height = 50;
            this.y = this.ground;
        }
    }
}
