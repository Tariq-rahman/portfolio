import GameObject from "./gameObject.js";

export default class Score extends GameObject{

    floatScore = 0;
    scoringRate = 0.1;
    score = 0;
    celebrate = false;
    blinking = true;
    celebrateTimer;
    celebrateScore;
    scoreSound;
    scoreDisplay = []; // max 5 digits
    scoreSprites = [];
    emptySprite;

    config = {
        MAX_TIMER: 90, //150 frames ~ 2 seconds
        BLINK_INTERVAL: 15,
        MAX_DIGITS: 5,
        GAP: 1.5,
    };

    constructor(canvas) {
        // Spawn in top right corner
        super(canvas, 540,  10, 9, 10.5, false);

        this.scoreSound = document.getElementById("point-sound")

        // get all sprites
        this.scoreSprites.push(document.getElementById('0'))
        this.scoreSprites.push(document.getElementById('1'))
        this.scoreSprites.push(document.getElementById('2'))
        this.scoreSprites.push(document.getElementById('3'))
        this.scoreSprites.push(document.getElementById('4'))
        this.scoreSprites.push(document.getElementById('5'))
        this.scoreSprites.push(document.getElementById('6'))
        this.scoreSprites.push(document.getElementById('7'))
        this.scoreSprites.push(document.getElementById('8'))
        this.scoreSprites.push(document.getElementById('9'))
        this.emptySprite = document.getElementById("empty")

        // set up zeros
        for (let i = 0; i < this.config.MAX_DIGITS; i++) {

            this.scoreDisplay.push(this.scoreSprites[0])
        }

        this.celebrateTimer = this.config.MAX_TIMER;
    }

    draw() {
        for (let i = 0; i < this.scoreDisplay.length; i++) {
            this.canvas.draw(this.scoreDisplay[i], this.x + (i * (this.width + this.config.GAP)), this.y, this.width, this.height)
        }
    }

    drawBlinkAnimation() {
        if (this.blinking) {
            for (let i = 0; i < this.scoreDisplay.length; i++) {
                this.canvas.draw(this.emptySprite, this.x + (i * (this.width + this.config.GAP)), this.y, this.width, this.height)
            }
        } else {
            // draw regular score
            this.calculateDisplayScore(this.celebrateScore)
            for (let i = 0; i < this.scoreDisplay.length; i++) {
                this.canvas.draw(this.scoreDisplay[i], this.x + (i * (this.width + this.config.GAP)), this.y, this.width, this.height)
            }
        }

        if (this.celebrateTimer % this.config.BLINK_INTERVAL === 0) {
            this.blinking = !this.blinking;
        }

    }

    calculateDisplayScore(customScore) {
        let score;
        // convert to string so we count number of characters
        if (customScore > 0 ) {
            score = customScore.toString()
        } else {
            score = this.score.toString()
        }

        // Score should be displayed like 00056, so we first need to insert 0's
        let numOfZeros = this.config.MAX_DIGITS - score.length

        let stringScore = '';
        for (let i = 0; i < numOfZeros; i++) {
            stringScore += '0'
        }
        stringScore += score;

        for (let i = 0; i < stringScore.length; i++) {
            let char = stringScore[i];
            let index = parseInt(char);

            this.scoreDisplay[i] = this.scoreSprites[index];
        }
    }

    incrementScore() {
        this.floatScore += this.scoringRate;
        this.score = Math.floor(this.floatScore);
        if (this.score % 100 === 0 && this.score !== 0) {
            this.scoreSound.play()
            // Reached a milestone of a 100, can celebrate now
            this.celebrate = true;
            this.celebrateScore = this.score;
        }
    }

    countDownCelebrate() {
        if (!this.celebrate) {
            return
        }

        if (this.celebrateTimer !== 0) {
            this.celebrateTimer--
            return
        }

        this.celebrate = false;
        this.blinking = true;
        this.celebrateTimer = this.config.MAX_TIMER;
    }

    update() {
        this.incrementScore()
        this.calculateDisplayScore()
        this.countDownCelebrate()

        if (this.celebrate) {
            this.drawBlinkAnimation()
        } else {
            this.draw()
        }
    }
}