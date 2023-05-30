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


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    write(ctx) {
        ctx.font = this.font;
        ctx.fillStyle = this.textColor;
        ctx.fillText(this.text, this.fontX, this.fontY);
    }


    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof Coin) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }


    fadeInImg(alpha) {
        let interval = setTimeout(() => {
            setInterval(() => {
                this.setTransparency(alpha);
            }, 20)
        }, 1000)
        stoppableIntervalID(interval);
    }
    

    youLost() {
        this.fadeInImg('alphaLost');
        this.showTryAgain();
    }

    gameOver() {
        this.fadeInImg('alphaGameOver');
        this.showTryAgain();
    }


    showTryAgain() {
        setTimeout(() => {
            document.getElementById('reload').classList.remove('display-none');
        }, 3500)
    }


    setTransparency(alpha) {
        world[alpha] += 0.015;;
    }
}