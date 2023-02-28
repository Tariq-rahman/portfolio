import GameObject from "./gameObject.js";
import Score from "./score.js";

export default class HighScore extends GameObject{

    // image of "HI" to annotate high score
    labelSprite;
    // Gap between "HI" and the score number
    gap = 10;
    // Score object to display high score
    scoreObject;
    // Name of the cookie used to store score
    cookieName = "dino-run"
    // How long the cookie will stay alive for
    expiryDays = 30;

    constructor(canvas, score) {
        // Spawn in top right corner
        super(canvas, 450,  10, 19, 10.5, false);

        this.scoreObject = new Score(canvas)
        this.scoreObject.x = this.x + this.width + this.gap;

        // Load the previous high score and replace it if this score is higher
        let pastHighScore = this.loadScore()
        if (score > pastHighScore) {
            this.saveScore(score)
            this.scoreObject.score = score
        } else {
            this.scoreObject.score = pastHighScore;
        }

        this.labelSprite = document.getElementById("hi")
    }

    // Save the score to the cookie and set the expiry date
    saveScore(score) {
        const d = new Date();
        d.setTime(d.getTime() + (this.expiryDays*24*60*60*1000));
        let expires = "expires="+ d.toUTCString();

        document.cookie = this.cookieName + "=" + score + ";" + expires + ";path=/";
    }

    // Get the score from the cookie
    // if not found return 0
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

    // Draw the high score then invert the colour to make it a different colour to the normal score
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

