import GameObject from "./gameObject.js";

export default class Cactus extends GameObject{
    // Type map is static as it needs to be accessed before the object is constructed
    static typeMap = {
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
        super(canvas, canvas.canvasWidth,  0, 0, 0, true);

        this.type = Cactus.typeMap[typeID];
        this.width = this.type.width;
        this.height = this.type.height;
        this.y = 145 - this.height;

        // consider retrieving the sprite config from separate file
        this.setActiveSprite(document.getElementById(this.type.name));

        // Set velocity to move left
        this.setVelocity(-5,0)
    }
}