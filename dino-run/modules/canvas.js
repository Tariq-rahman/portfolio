// Canvas drawing functions
export default class Canvas {
    ctx;
    canvasHeight;
    canvasWidth;

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

    setFillStyle(color) {
        this.ctx.fillStyle = color;
    }

    setStrokeStyle(color) {
        this.ctx.strokeStyle = color;
    }

    invertColour(x, y, w, h) {
        const imageData = this.ctx.getImageData(x, y, w, h)
        const data = imageData.data;

        for (let i = 0; i < data.length; i +=4) {
            data[i] = 255 - data[i]; // red
            data[i + 1] = 255 - data[i + 1]; // green
            data[i + 2] = 255 - data[i + 2]; // blue
        }
        this.ctx.putImageData(imageData, x, y);
    }
}
