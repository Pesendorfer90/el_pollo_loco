class MovableObject extends DrawableObject {
    x = 0;
    speed = 0.12;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.5;
    energy = 100;
    lastHit = 0;


    applyGravitiy() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25)
    }

    isAboveGround() {
        return this.y < 140;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    moveRight() {
        this.x += this.speed;
    }


    moveLeft() {
        this.x -= this.speed;
    }


    jump() {
        this.speedY = 20;
    }


    fallDown() {
        setInterval(() => {
            this.speedY = 10
            this.acceleration = 1.5;
            this.y += 1;
        }, 1000 / 60)
    }


    isCollidiong(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height
    }


    jumpOnEnemy(mo) {
        return this.x + this.width > mo.x &&
            this.x < mo.x &&
            this.y + this.height > mo.y
    }

    hit() {
        this.energy -= 5;
        console.log(this.energy)
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; // Difference in ms
        timepassed = timepassed / 1000 // Difference in sec
        return timepassed < 0.5;
    }

    isDead() {
        return this.energy == 0;
    }

}