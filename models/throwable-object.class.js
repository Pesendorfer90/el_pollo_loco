/**
 * Represents a ThrowableObject object in the game.
 * @extends MovableObject
 */
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


    /**
     * Creates a new instance of the ThrowableObject class.
     */
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


    /**
     * This function starts 3 functions to animate the ThrowableObject and determine the throwing direction.
     * A bottle is deleted from the array of the salsaBottleBar.
     * After 850ms the object ThroableObject and the intervals are deleted.
     */
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


    /**
     * Starts the animation.
     */
    animate() {
        this.animateInterval = setInterval(() => {
            this.checkBottleColision();
            this.bottleRotation();
        }, 50)
    }


    /**
     * Checks if ThrowableObjects collides with an enemy.
     * If ThrowableObjects collides with an enemy, an animation starts and 2 intervals are deleted.
     */
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


    /**
     * As long as the ThroableObjects have not collided, the animation below will play.
     */
    bottleRotation() {
        if (!this.bottleSplashed) {
            this.playAnimationLoop(this.IMAGES_BOTTLES);
        }
    }


    /**
     * Activate gravity to make the bottle fall down.
     */
    bottleGravity() {
        this.applyGravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)
    }


    /**
     * Check in which direction ThrowableObjects is thrown.
     */
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


    /**
     * This function is played as soon as ThrowableObjects has collided with an enemy.
     */
    bottleSplash() {
        startSound(this.bottleSmash_sound);
        this.splashInterval = setInterval(() => {
            this.playAnimationLoop(this.IMAGES_BOTTLES_SPLASH);
        }, 142)
    }
}