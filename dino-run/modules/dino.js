import GameObject from "./gameObject.js";

export default class Dino extends GameObject {

    // Sprites
    runningSprites = [];
    duckingRunningSprites = [];
    deadSprite;

    // Sounds
    jumpSound;
    dieSound;

    // Statuses
    status = "RUNNING";
    statuses = {
        running: "RUNNING",
        ducking: "DUCKING",
        jumping: "JUMPING"
    }

    config = {
        DROP_VELOCITY: -5,
        GRAVITY: 0.6,
        HEIGHT: 47,
        HEIGHT_DUCK: 30,
        INITIAL_JUMP_VELOCITY: -10,
        INTRO_DURATION: 1500,
        MAX_JUMP_HEIGHT: 30,
        MIN_JUMP_HEIGHT: 30,
        // SPEED_DROP_COEFFICIENT: 3,
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
        this.playAnimation()

        // set up listeners
        document.addEventListener("keydown", (event) => {
            switch (event.code) {
                case "ArrowUp":
                case "Space":
                    this.jump()
                    break;
                case "ArrowDown":
                    this.duck()
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

        // Fall towards ground
        if (this.y < this.ground()) {
            this.setVelocity(0, this.velocity.y + this.config.GRAVITY)
        }

        // resume running after jump
        if (this.y >= this.ground() && this.velocity.y !== 0) {
            console.log("resumed running")
            this.status = this.statuses.running;
            this.setVelocity(0, 0);
            this.playAnimation()
            this.y = this.ground()
       }
    }


    jump() {
        // Can't jump if ducking
        if (this.isDucking()) {
            return;
        }

        // Can only jump if dino is on the ground
        if (this.y !== this.ground()) {
            console.log("not on ground yet")
            return;
        }

        this.status = this.statuses.jumping;
        this.stopAnimation()
        this.jumpSound.play()
        this.setVelocity(0, this.config.INITIAL_JUMP_VELOCITY);
    }

    duck() {
        // If we're already ducking, no need to do anything
        if (this.isDucking()) {
            return;
        }

        // Can only duck on ground
        if (this.y === this.ground()) {
            // Set the status to ducking
            this.status = this.statuses.ducking;

            // Set height, width and position
            this.width = this.config.WIDTH_DUCK;
            this.height = this.config.HEIGHT_DUCK;
            this.y = this.ground();

            // Sort out animation
            this.setAnimationSprites(this.duckingRunningSprites)
            this.animateNow();
        }
    }

    stand() {
        if (this.isJumping()) {
            return
        }

        this.status = this.statuses.running
        this.setAnimationSprites(this.runningSprites)
        this.width = this.config.WIDTH;
        this.height = this.config.HEIGHT;
        this.y = this.ground();
        this.animateNow();
    }

    isDucking() {
        return this.status === this.statuses.ducking;
    }

    isJumping() {
        return this.status === this.statuses.jumping;
    }

    ground() {
        if (this.status === this.statuses.ducking) {
            return this.canvas.canvasHeight - this.config.HEIGHT_DUCK;
        } else {
            return this.canvas.canvasHeight - this.config.HEIGHT;
        }
    }

    die() {
        if (this.height === this.config.HEIGHT_DUCK) {
            this.stand()
        }

        this.setActiveSprite(this.deadSprite)
        this.stopAnimation()
        this.dieSound.play()
    }
}
