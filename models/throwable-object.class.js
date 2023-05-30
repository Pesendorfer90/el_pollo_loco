class ThrowableObject extends MovableObject {

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    ];

    IMAGES_BOTTLES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    bottleSmash_sound = new Audio('audio/bottle-smash.mp3');

    bottleSplashed = false;
    throwInterval;
    applyGravityInterval;
    animateInterval;
    splashInterval;

    constructor(x, y) {
        super().loadImage(this.IMAGES_BOTTLES[0])
        this.loadImages(this.IMAGES_BOTTLES)
        this.loadImages(this.IMAGES_BOTTLES_SPLASH)
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.speedY = 12;
        this.throw();
    }

    throw() {
        this.bottleGravity();
        this.throwDirecton();
        this.animate();
        world.salsaBottleBar.removeBottle();
        setTimeout(() => {
            world.throwableObject.splice(0, 1);
            clearInterval(this.animateInterval)
            clearInterval(this.splashInterval)
        }, 850)
    }


    animate() {
        this.animateInterval = setInterval(() => {
            this.checkBottleColision();
            this.bottleRotation();
        }, 50)
    }


    checkBottleColision() {
        world.level.allEnemies.forEach(enemy => {
            if (enemy.isCollidiong(this) && !enemy.isDead()) {
                this.bottleSplash();
                clearInterval(this.throwInterval);
                clearInterval(this.applyGravityInterval)
                this.bottleSplashed = true;
            }
        });
    }


    bottleRotation() {
        if (!this.bottleSplashed) {
            this.playAnimationLoop(this.IMAGES_BOTTLES);
        }
    }


    bottleGravity() {
        this.applyGravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)
    }


    throwDirecton() {
        let direction = world.character.otherDirection
        this.throwInterval = setInterval(() => {
            if (!direction) {
                this.x += 3.5;
            } else {
                this.x -= 3.5;
            }
        }, 5)
    }


    bottleSplash() {
        startSound(this.bottleSmash_sound);
        this.splashInterval = setInterval(() => {
            this.playAnimationLoop(this.IMAGES_BOTTLES_SPLASH);
        }, 142)
    }
}