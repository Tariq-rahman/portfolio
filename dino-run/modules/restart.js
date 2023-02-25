import GameObject from "./gameObject.js";

export default class Restart extends GameObject{
    constructor(canvas) {
        // draw in center
        super(canvas, 282, 65, 36, 32, false);

        this.setActiveSprite(document.getElementById("restart"));
    }
}