import GameObject from "./gameObject.js";

export default class GameOver extends GameObject{
    constructor(canvas) {
        // draw in center
        super(canvas, 205, 40, 190.5, 10.5, false);

        this.setActiveSprite(document.getElementById("game-over"));
    }
}