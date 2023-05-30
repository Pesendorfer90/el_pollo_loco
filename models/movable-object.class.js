class MovableObject extends DrawableObject {
    x = 0;
    speed = 0.12;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.8;
    energy = 100;
    health = 100;
    lastThrow = 0;
    lastHit = 0;
    gravityDeadCharacterInterval;
    hurtWaitingTime;
    hitStrength;


    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)
        setTimeout(() => {
            stoppableIntervalID(gravityInterval);
        }, 3500)
    }


    stayOnGround() {
        let groundInterval = setInterval(() => {
            if (!this.isAboveGround() && !world.character.characterDead) {
                this.speedY = 0;
                this.y = 140;
            }
        }, 10)
        setTimeout(() => {
            stoppableIntervalID(groundInterval);
        }, 3500)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } if (this instanceof ChickenBaby) {
            return this.y < 370;
        } else {
            return this.y < 140;
        }
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


    jump(speedY) {
        this.speedY = speedY;
    }


    fallDown() {
        let fallDownInterval = setInterval(() => {
            this.speedY = 12
            this.acceleration = 5.5;
            this.y += 1;
        }, 1)
        setTimeout(() => {
            stoppableIntervalID(fallDownInterval);
        }, 3500)
    }


    isCollidiong(mo) {
        return this.x + this.width - 30 > mo.x &&
            this.y + this.height -14 > mo.y &&
            this.x -5 < mo.x &&
            this.y < mo.y + mo.height
    }


    jumpOnEnemy(mo) {
        return this.x + this.width - 30 > mo.x &&
            this.x - 5 < mo.x &&
            this.y + this.height -14 > mo.y
    }


    hit(i) {
        this.energy -= i;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    lastTime(lastAction, waitingPeriod) {
        let timepassed = new Date().getTime() - lastAction; // Difference in ms
        timepassed = timepassed / 1000 // Difference in sec
        return timepassed < waitingPeriod;
    }


    isDead() {
        return this.energy == 0;
    }


    deadAnimation(i) {
        let counter = 0;
        const intervalId = setInterval(() => {
            if (counter > i) {
                clearInterval(intervalId);
            } else {
                this.playAnimationLoop(this.IMAGES_DEAD);
                counter++;
            }
        }, 150);

        if (world.character.characterDead || world.level.endboss[0].endbossDead) {
            setTimeout(() => {
                let fallDownInterval = setInterval(() => {
                    this.fallDown();
                }, 120)
                setTimeout(() => {
                    stoppableIntervalID(fallDownInterval);
                }, 3500)
            }, 230)
        }
    }
}