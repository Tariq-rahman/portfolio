import GameObject from "./gameObject.js";

// todo consider builder pattern for this class
export default class Cactus extends GameObject{
    typeMap = {
        1: {
            name: 'cactus-1',
            width: 20,
            height: 40,
        },
        2: {
            name: 'big-cactus-1',
            width: 30,
            height: 50
        }
    }

    type;

    constructor(canvas, typeID) {
        // spawn off canvas
        super(canvas, canvas.canvasWidth,  100, 0, 0, true);

        this.type = this.typeMap[typeID];
        this.width = this.type.width;
        this.height = this.type.height;

        // consider retrieving the sprite config from separate file
        this.setActiveSprite(document.getElementById(this.type.name));

        // Set velocity to move left
        this.setVelocity(-15,0)
    }
}