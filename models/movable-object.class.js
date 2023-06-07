/**
 * Represents a moveable object in the game.
 * @extends DrawableObjects
 */
class MovableObject extends DrawableObject {
    x = 0;
    speed = 0.12;
    otherDirection = false;
    speedY = 0;
    acceleration = 0.8;
    energy = 100;
    lastThrow = 0;
    lastHit = 0;
    gravityDeadCharacterInterval;
    hurtWaitingTime;
    hitStrength;


    /**
     * Applies gravity to the moveable object.
     */
    applyGravity() {
        let gravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 60)
        stoppableIntervalID(gravityInterval);
    }


    /**
     * An auxiliary function to keep the character at the right height.
     * If the character is dead he falls through the ground.
     */
    stayOnGround() {
        let groundInterval = setInterval(() => {
            if (!this.isAboveGround() && !world.character.characterDead) {
                this.speedY = 0;
                this.y = 140;
            }
        }, 10)
            stoppableIntervalID(groundInterval);
    }


    /**
     * This function is required to check if objects are above the ground.
     * ThrowableObject is always true so it can fall down.
     * ChickenBaby can jump. In order to ensure that it is on the same ground as the character and does not fall through the ground, it is specified here where the ground is
     * The last if and else is for the Character. "if this.isDead() == true" the character falls through the floor.
     * @returns {boolean} - True if a movableObject is below a specified y value, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } if (this instanceof ChickenBaby) {
            return this.y < 370;
        } else if (this.isDead()) {
            return true
        } else {
            return this.y < 140;
        }
    }


    /**
     * This function checks if a MovableObject is moving up or down.
     * This function is used so that the enemy don't die when the character moves up.
     * @returns {boolean} - True when the character moves down, false otherwise.
     */
    isPositiv() {
        return this.speedY < 0;
    }


    /**
     * Plays an animation for the object using a set of images.
     * @param {string[]} images - The paths to the images for the animation.
     */
    playAnimationLoop(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }


    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }


    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }


    /**
     * Makes the object jump.
     * @param {number} speedY - The number determines how high the object jumps.
     */
    jump(speedY) {
        this.speedY = speedY;
    }


    /**
     * Drops an object through the ground with the specified speed and acceleration.
     */
    fallDown() {
        let fallDownInterval = setInterval(() => {
            this.speedY = 12
            this.acceleration = 5.5;
            this.y += 1;
        }, 1)
        setTimeout(() => {
            clearInterval(fallDownInterval);
        }, 3500)
    }


    /**
     * checks whether objects collide with each other
     * @param {Object} mo - Can be any movableObject.
     * @returns {boolean} - True if 2 objects collide with each other, false otherwise.
     */
    isCollidiong(mo) {
        return this.x + this.width - 30 > mo.x &&
            this.y + this.height - 14 > mo.y &&
            this.x - 5 < mo.x &&
            this.y < mo.y + mo.height
    }


    /**
     * Checks if the character collides with an enemy from above.
     * @param {Object} mo - Can be any movableObject. I only use it for the character.
     * @returns {boolean} - True if the character falls onto an enemy in a downward motion, false otherwise.
     */
    jumpOnEnemy(mo) {
        return this.x + this.width - 30 > mo.x &&
            this.x - 5 < mo.x &&
            this.y + this.height - 14 > mo.y
    }


    /**
     * This function subtracts a certain value from the energy of a MovableObject.
     * If a MovableObject is already dead, the energy that is drained is reset to 0.
     * Otherwise a new time is created.
     * @param {number} i - number that is deducted from the energy
     */
    hit(i) {
        this.energy -= i;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    /**
     * Checks when an action was last executed and returns true or false accordingly.
     * @param {date} lastAction - The date when a MovableObject was last hurt or a bottle was thrown.
     * @param {number} waitingPeriod - The time that must elapse before a MovableObject can be hurt again or a bottle can be thrown again.
     * @returns {boolean} - True if the wait time has expired, false otherwise.
     */
    lastTime(lastAction, waitingPeriod) {
        let timepassed = new Date().getTime() - lastAction;
        timepassed = timepassed / 1000;
        return timepassed < waitingPeriod;
    }


    /**
     * Checks if an MovableObject dead.
     * @returns True if energy is zero, false otherwise.
     */
    isDead() {
        return this.energy == 0;
    }


    /**
     * This function is responsible for the animation when the character or the final boss is dead.
     * @param {number} i - Number of executions.
     */
    deadAnimation(i) {
        let counter = 0;
        let intervalId = setInterval(() => {
            if (counter > i) {
                clearInterval(intervalId);
            } else {
                this.playAnimationLoop(this.IMAGES_DEAD);
                counter++;
            }
        }, 150);
    }
}