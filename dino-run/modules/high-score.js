import GameObject from "./gameObject.js";
import Score from "./score.js";

export default class HighScore extends GameObject{

    labelSprite;
    gap = 10;
    expiryDays = 30;
    scoreObject;
    cookieName = "dino-run"

    constructor(canvas, score) {
        // Spawn in top right corner
        super(canvas, 450,  10, 19, 10.5, false);

        this.scoreObject = new Score(canvas)
        this.scoreObject.x = this.x + this.width + this.gap;

        let pastHighScore = this.loadScore()
        if (score > pastHighScore) {
            this.saveScore(score)
            this.scoreObject.score = score
        } else {
            this.scoreObject.score = pastHighScore;
        }

        this.labelSprite = document.getElementById("hi")
    }

    saveScore(score) {
        const d = new Date();
        d.setTime(d.getTime() + (this.expiryDays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();

        document.cookie = this.cookieName + "=" + score + ";" + expires + ";path=/";
    }

    loadScore() {
        let name = this.cookieName + "=";
        let cookie = decodeURIComponent(document.cookie);
        let ca = cookie.split(';');

        for(let i = 0; i <ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }

            if (c.indexOf(name) === 0) {
                let num =  c.substring(name.length, c.length);

                return parseInt(num);
            }
        }

        return 0;
    }

    draw() {
        this.canvas.quickDraw(this.labelSprite, this)
        this.scoreObject.calculateDisplayScore();
        this.scoreObject.draw()

        this.canvas.invertColour(
            this.x,
            this.y,
            this.width + this.gap + this.scoreObject.maxDigits * (this.scoreObject.width + this.scoreObject.gap),
            this.height
        );
    }
}

