//////////////////////////////
// Canvas drawing functions //
//////////////////////////////
export default class Canvas {

    constructor(canvasCtx) {
        this.ctx = canvasCtx;
        this.canvasHeight = 150;
        this.canvasWidth = 600;
    }


    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
    }

    quickDraw(img, canvasLocation) {
        this.ctx.drawImage(img, canvasLocation.x, canvasLocation.y, canvasLocation.width, canvasLocation.height);
    }

    draw(img, x, y, w, h) {
        this.ctx.drawImage(img, x, y, w, h);
    }
}
