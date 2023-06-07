/**
 * Represents the game world.
 */
class World {

    startScreen = new StartScreen();
    character = new Character();
    gameOver = new GameOver();
    youLost = new YouLost();
    statusBar = new StatusBar();
    healthBarEndboss = new HealthBarEndboss();
    coinBar = new CoinBar();
    salsaBottleBar = new SalsaBottleBar();
    throwableObject = [];
    level;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    alphaLost = 0;
    alphaGameOver = 0;
    alphaEndbossHealthBar = 0;


    /**
     * Creates a new game world.
     * @param {HTMLCanvasElement} canvas - The canvas element.
     */
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.level = level1;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }


    /**
     * Sets the world reference for the character.
     */
    setWorld() {
        this.character.world = this;
    }


    /**
     * Checks for collisions between game objects.
     */
    checkCollisions() {
        let collisionIntervall = setInterval(() => {
            this.enemyCollision();
            this.coinCollision();
            this.bottleCollision();
        }, 10)
        stoppableIntervalID(collisionIntervall);
    }


    /**
     * Handles collisions between the character and enemies.
     */
    enemyCollision() {
        this.level.allEnemies.forEach((enemy) => {
            this.enemyHurtCharacter(enemy, enemy.hitStrength);
            this.characterHurtEnemy(enemy);
            this.bottleHitEnemy(enemy)
        })
    }


    /**
     * This function checks if the character collides with an enemy,
     * whether the last collision with an enemy was long enough ago,
     * if the enemy is not dead,
     * if the character is not dead
     * and whether the character is on the ground.
     * @param {object} enemy - An enemy.
     * @param {number} hitStrength - How much energy is withdrawn.
     */
    enemyHurtCharacter(enemy, hitStrength) {
        if (this.character.isCollidiong(enemy) &&
            this.character.lastTime(this.character.lastHit, this.character.throwWaitingTime) == false &&
            !enemy.isDead() &&
            this.character.isAboveGround() == false) {
            this.enemyCollides(hitStrength);
        }
    }


    /**
     * This function checks if the character jumps on an enemy from above,
     * whether the character makes a downward movement,
     * if the enemy is not dead and
     * if the character is not dead.
     * If everything matches, the enemy dies and the character jumps.
     * @param {object} enemy - An enemy.
     */
    characterHurtEnemy(enemy) {
        if (this.character.jumpOnEnemy(enemy) &&
            // this.character.isAboveGround() == true &&
            this.character.isPositiv() &&
            !enemy.isDead() && !this.character.isDead()) {
            enemy.energy = 0;
            this.character.jump(10);
        }
    }


    /**
     * Checks if the character collides with a coin.
     */
    coinCollision() {
        this.level.coin.forEach((coin, i) => {
            if (this.character.isCollidiong(coin)) {
                this.level.coin.splice(i, 1);
                this.coinBar.getCoin();
            }
        })
    }


    /**
     * Checks if the character collides with a salsabottle.
     */
    bottleCollision() {
        this.level.salsaBottle.forEach((salsaBottle, i) => {
            if (this.character.isCollidiong(salsaBottle)) {
                this.salsaBottleBar.getBottle();
                this.level.salsaBottle.splice(i, 1);
            }
        })
    }


    /**
     * If the enemy collides with the character, the hit strength is subtracted from the energy and the character's status bar is updated.
     * @param {number} hitStrength - How much energy is withdrawn.
     */
    enemyCollides(hitStrength) {
        this.character.hit(hitStrength);
        this.statusBar.setHealth(this.character.energy);
    }


    /**
     * Collides an enemy with a ThrowableObject and
     * it's been longer than hurtWaitingTime since the last hit
     * 20 energy is drained from the enemy.
     * If the enemy is the Endboss, the healthBarEndboss is also updated.
     * @param {object} enemy - An enemy.
     */
    bottleHitEnemy(enemy) {
        this.throwableObject.forEach((salsaBottle) => {
            if (enemy.isCollidiong(salsaBottle) &&
                !enemy.lastTime(enemy.lastHit, enemy.hurtWaitingTime)) {
                enemy.hit('20');
                if (enemy == world.level.endboss[0]) {
                    this.healthBarEndboss.setHealth(enemy.energy);
                }
            }
        })
    }


    /**
     * Draws the game world and its objects on the canvas.
     * The function keeps restarting itself.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        if (gameStarted) {
            this.addObjectsToMap(this.level.backgroundObjects);

            this.addToMap(this.character);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.enemies);
            this.addObjectsToMap(this.level.endboss);
            this.addObjectsToMap(this.throwableObject);
            this.addObjectsToMap(this.level.coin);
            this.addObjectsToMap(this.level.salsaBottle);

            this.ctx.translate(-this.camera_x, 0);
            // ----------- Space for fixed objects --------------
            this.addToMap(this.statusBar);
            this.addToMap(this.coinBar);
            this.addToMap(this.coinBar, 'text');
            this.addToMap(this.salsaBottleBar);
            this.addToMap(this.salsaBottleBar, 'text');

            // ------- Space for fixed and transparent objects --------
            if (this.character.characterDead) {
                this.ctx.globalAlpha = this.alphaLost;
                this.addToMap(this.youLost);
                this.ctx.globalAlpha = 1;
            } if (!this.level.endboss[0].hadFirstContact) {
                this.ctx.globalAlpha = this.alphaEndbossHealthBar;
                this.addToMap(this.healthBarEndboss);
                this.ctx.globalAlpha = 1;
            } if (this.level.endboss[0].endbossDead) {
                this.ctx.globalAlpha = this.alphaGameOver;
                this.addToMap(this.gameOver);
                this.ctx.globalAlpha = 1;
            }
            this.ctx.translate(this.camera_x, 0);
        }

        this.ctx.translate(-this.camera_x, 0);
        //----------- Space for fixed objects at Start --------------
        if (!gameStarted) {
            this.addToMap(this.startScreen);
        }
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
     * Adds an object or an array of objects to the rendering map.
     * @param {object|object[]} objects - The object(s) to be added to the map.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * Adds an object to the rendering map.
     * @param {object} object - The object to be added to the map.
     */
    addToMap(mo, i) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        } if (i == 'text') {
            mo.write(this.ctx, i)
        } else {
            mo.draw(this.ctx);
            // mo.drawFrame(this.ctx);
        } if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    /**
     * Flips the image of the object horizontally.
     * @param {string} ctx - The rendering context.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
     * Reverts the image of the object back to its original orientation.
     * @param {string} ctx - The rendering context.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}