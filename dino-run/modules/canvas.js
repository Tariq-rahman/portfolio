//////////////////////////////
// Canvas drawing functions //
//////////////////////////////
export default class Canvas {

    constructor(canvasCtx, spriteMap) {
        this.ctx = canvasCtx;
        this.spriteMap = spriteMap;
        this.canvasHeight = 150;
        this.canvasWidth = 600;
    }


    clearCanvas() {
        ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

    quickDraw(srcImg, canvasLocation) {
        this.ctx.drawImage(
            this.spriteMap,
            srcImg.x,
            srcImg.y,
            srcImg.width,
            srcImg.height,
            canvasLocation.x,
            canvasLocation.y,
            canvasLocation.width,
            canvasLocation.height
        );
    }
}

// function createSpriteDefinition() {
//     return {
//         CACTUS_LARGE: {x: 332, y: 2, width: 0, height: 0},
//         CACTUS_SMALL: {x: 228, y: 2, width: 0, height: 0},
//         CLOUD: {x: 86, y: 2, width: 0, height: 0},
//         HORIZON: {x: 2, y: 54, width: 600, height: 0},
//         MOON: {x: 484, y: 2, width: 0, height: 0},
//         PTERODACTYL: {x: 134, y: 2, width: 0, height: 0},
//         RESTART: {x: 2, y: 2, width: 0, height: 0},
//         TEXT_SPRITE: {x: 655, y: 2, width: 0, height: 0},
//         DINO: {x: 1678, y: 2, width: 85, height: 100},
//         DINO_RUNNING: [
//             {x: 1851, y: 2, width: 88, height: 100},
//             {x: 1938, y: 2, width: 88, height: 100}
//         ],
//         DINO_DUCKING_1: {x: 0, y: 0, width: 0, height: 0},
//         DINO_DUCKING_2: {x: 0, y: 0, width: 0, height: 0},
//         DINO_DEAD: {x: 0, y: 0, width: 0, height: 0},
//         STAR: {x: 645, y: 2, width: 0, height: 0}
//     }
// }
