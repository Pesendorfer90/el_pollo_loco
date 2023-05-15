class MovableObject extends DrawableObject {
    x = 0;
    speed = 0.12;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.8;
    energy = 100;
    lastHit = 0;
    lastThrow = 0;
    applyGravitiyInterval;
    gravitiyDeadCharacterInterval;


    applyGravitiy() {
        this.applyGravitiyInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)

        this.gravitiyDeadCharacterInterval = setInterval(() => {
            if (!this.isAboveGround() && !world.character.characterDead) {
                this.speedY = 0;
                this.y = 140;
            }
        }, 10)
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
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
        setInterval(() => {
            this.speedY = 12
            this.acceleration = 5.5;
            this.y += 1;
        }, 1)
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
        return timepassed < 0.85;
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
                console.log(counter);
            }
        }, 150);

        if (world.character.characterDead || world.level.endboss[0].endbossDead) {
            setTimeout(() => {
                setInterval(() => {
                    this.fallDown();
                }, 120)
            }, 230)
        }
    }
}