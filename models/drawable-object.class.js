/**
 * Represents a drawable object with basic drawing functionality.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x;
    y;
    height;
    width;
    textColor;
    font;
    fontX;
    fontY;
    alpha = 0;


    /**
     * Loads an image for the object.
     * @param {string} path - The path of the image to load.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    /**
     * Loads multiple images into the image cache.
     * @param {string[]} arr - An array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    /**
     * Draws the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * Write the object on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The rendering context of the canvas.
     */
    write(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.textColor;
        ctx.fillText(this.text, this.fontX, this.fontY);
    }


    /**
     * Increases the transparency of images.
     * @param {number} alpha - The value of transparency from 0 to 1.
     */
    fadeInImg(alpha) {
        let interval = setInterval(() => {
                this.setTransparency(alpha);
            }, 20)
            setTimeout(() => {
                clearInterval(interval)
            }, 2000)
    }
    

    /**
     * Increases the transparency of the image when you die
     */
    youLost() {
        this.fadeInImg('alphaLost');
        this.showTryAgain();
    }


    /**
     * Increases the transparency of the image when you win.
     */
    gameOver() {
        this.fadeInImg('alphaGameOver');
        this.showTryAgain();
    }


    /**
     * Displays the Try again button after winning or losing.
     */
    showTryAgain() {
        setTimeout(() => {
            document.getElementById('reload').classList.remove('display-none');
        }, 3000)
    }


    /**
     * Increases the value of alpha by 0.015.
     * @param {string} alpha - The globalAlpha Value to increase.
     */
    setTransparency(alpha) {
        world[alpha] += 0.015;;
    }
}