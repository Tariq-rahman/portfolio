import GameObject from "./gameObject.js";

export default class Dino extends GameObject {

    // Sprites
    runningSprites = [];
    duckingRunningSprites = [];
    deadSprite;

    // Sounds
    jumpSound;
    dieSound;


    config = {
        DROP_VELOCITY: -5,
        GRAVITY: 0.6,
        HEIGHT: 47,
        HEIGHT_DUCK: 30,
        INITIAL_JUMP_VELOCITY: -10,
        INTRO_DURATION: 1500,
        // MAX_JUMP_HEIGHT: 30,
        // MIN_JUMP_HEIGHT: 30,
        // SPEED_DROP_COEFFICIENT: 3,
        // START_X_POS: 50,
        WIDTH: 44,
        WIDTH_DUCK: 59
    };

    constructor(canvas) {
        super(canvas, 0,  0, 0, 0, true);
        this.height = this.config.HEIGHT;
        this.width = this.config.WIDTH;
        this.y = this.ground();

        // Get sounds
        this.jumpSound = document.getElementById("jump-sound");
        this.dieSound = document.getElementById("die-sound");

        // Get sprites
        this.setActiveSprite(document.getElementById("dino-run-1"));
        this.deadSprite = document.getElementById("dino-dead")
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
                    this.stand()
                    break;
            }
        })
    }

    move() {
        super.move();

        if (this.y < this.ground()) {
            this.setVelocity(0, this.velocity.y + this.config.GRAVITY)
        }

        if (this.y >= this.ground() && this.velocity.y !== 0) {
            this.setVelocity(0, 0);
            this.animation = true;
            this.y = this.ground()
       }
    }


    jump() {
        // Can only jump if dino is on the ground. 80 is ground
        if (this.y === this.ground()) {
            this.animation = false;
            this.jumpSound.play()
            // The vertical velocity
            this.setVelocity(0, this.config.INITIAL_JUMP_VELOCITY);
        }
    }

    duck() {
        // can only duck on ground
        if (this.y === this.ground()) {
            this.setAnimationSprites(this.duckingRunningSprites)
            // set height
            this.width = this.config.WIDTH_DUCK;
            this.height = this.config.HEIGHT_DUCK;
            this.y = 140 - this.config.HEIGHT_DUCK
            this.animateNow()
        }
    }

    stand() {
        this.setAnimationSprites(this.runningSprites)
        // set height
        this.width = this.config.WIDTH;
        this.height = this.config.HEIGHT;
        this.y = this.ground();
        this.animateNow()
    }

    ground() {
        return 150 - this.config.HEIGHT
    }

    die() {
        if (this.height === this.config.HEIGHT_DUCK) {
            this.stand()
        }
        this.setActiveSprite(this.deadSprite)
        this.animation = false;
        this.dieSound.play()
    }
}
