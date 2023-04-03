class MovableObject extends DrawableObject {
    x = 0;
    speed = 0.12;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.8;
    energy = 10;
    lastHit = 0;


    applyGravitiy() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)

        setInterval(() => {
            if (!this.isAboveGround() && !world.character.characterDead) {
                this.speedY = 0;
                this.y = 140;
            }
        }, 1)
    }

    isAboveGround() {
        return this.y < 140;
    }


    isPositiv() {
        return this.speedY < 0;
    }


    playAnimationLoop(images) {
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
        clearInterval(this.intervalJump);
        this.jumpCounter = 0;
        this.characterJumping = false;
        this.speedY = 12;
    }


    fallDown() {
        setInterval(() => {
            this.speedY = 12
            this.acceleration = 5.5;
            this.y += 1;
        }, 1)
    }


    isCollidiong(mo) {
        return this.x + this.width - 30 > mo.x &&
            this.y + this.height > mo.y &&
            this.x - 30 < mo.x &&
            this.y < mo.y + mo.height
    }


    jumpOnEnemy(mo) {
        return this.x + this.width - 30 > mo.x &&
            this.x - 30 < mo.x &&
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