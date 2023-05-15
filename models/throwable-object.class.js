class ThrowableObject extends MovableObject {

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_BOTTLES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    bottleSplashed = false;
    throwInterval;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
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
        this.applyGravitiy();
        this.throwDirecton();
        this.animate();
        world.salsaBottleBar.removeBottle();
        setTimeout(() => {
            world.throwableObject.splice(0, 1);
        }, 850)
    }


    animate() {
        setInterval(() => {
            if (this.isCollidiong(world.level.endboss[0])) {
                if (!this.bottleSplashed) {
                    setTimeout(() => {
                        this.bottleSplashed = true;
                        this.bottleSplash();
                        clearInterval(this.throwInterval);
                        clearInterval(this.applyGravitiyInterval)
                    }, 120);
                    ;
                }

            } else if (!this.bottleSplashed) {
                this.playAnimationLoop(this.IMAGES_BOTTLES);
            }
        }, 70)
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
        setInterval(() => {
            this.playAnimationLoop(this.IMAGES_BOTTLES_SPLASH);
        }, 142)
    }
}