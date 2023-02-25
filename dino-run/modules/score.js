import GameObject from "./gameObject.js";

export default class Score extends GameObject{

    floatScore = 0;
    score = 0;
    maxDigits = 5;
    scoreSound;
    scoreDisplay = []; // max 5 digits
    scoreSprites = [];

    constructor(canvas) {
        // Spawn in top right corner
        super(canvas, 550,  10, 9, 10.5, false);

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

        // set up zeros
        for (let i = 0; i < this.maxDigits; i++) {

            this.scoreDisplay.push(this.scoreSprites[0])
        }
    }

    draw() {
        for (let i = 0; i < this.scoreDisplay.length; i++) {
            this.canvas.draw(this.scoreDisplay[i], this.x + (i * this.width), this.y, this.width, this.height)
        }
    }

    calculateDisplayScore() {
        // convert to string so we count number of characters
        let score = this.score.toString()
        // Score should be displayed like 00056, so we first need to insert 0's
        let numOfZeros = this.maxDigits - score.length

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
        this.floatScore += 0.1;
        this.score = Math.floor(this.floatScore);
        if (this.score % 100 === 0 && this.score !== 0) {
            this.scoreSound.play()
            this.blinkAnimation()
        }
    }

    blinkAnimation() {

    }

    update() {
        this.incrementScore()
        this.calculateDisplayScore()
        this.draw()
    }
}