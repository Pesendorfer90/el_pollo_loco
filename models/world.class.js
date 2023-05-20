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
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    alphaLost = 0;
    alphaGameOver = 0;
    alphaEndbossHealthBar = 0;

    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.checkCollisions();
    }


    setWorld() {
        this.character.world = this;
    }


    checkCollisions() {
        setInterval(() => {
            this.enemyCollision();
            this.coinCollision();
            this.bottleCollision();
        }, 10)
    }


    enemyCollision() {
        this.level.allEnemies.forEach((enemy) => {
            this.enemyHurtCharacter(enemy, enemy.hitStrength);
            this.characterHurtEnemy(enemy);
            this.bottleHitEnemy(enemy)
        })
    }


    enemyHurtCharacter(enemy, hitStrength) {
        if (this.character.isCollidiong(enemy) &&
            this.character.lastTime(this.character.lastHit, this.character.throwWaitingTime) == false &&
            !enemy.isDead() &&
            this.character.isAboveGround() == false) {
            this.enemyCollides(hitStrength);
        }
    }


    characterHurtEnemy(enemy) {
        if (this.character.jumpOnEnemy(enemy) &&
            this.character.isAboveGround() == true &&
            this.character.isPositiv() &&
            !enemy.isDead()) {
            enemy.energy = 0;
            this.character.jump(10);
        }
    }


    coinCollision() {
        this.level.coin.forEach((coin, i) => {
            if (this.character.isCollidiong(coin)) {
                this.level.coin.splice(i, 1);
                this.coinBar.getCoin();
            }
        })
    }


    bottleCollision() {
        this.level.salsaBottle.forEach((salsaBottle, i) => {
            if (this.character.isCollidiong(salsaBottle)) {
                this.salsaBottleBar.getBottle();
                this.level.salsaBottle.splice(i, 1);
            }
        })
    }


    enemyCollides(hitStrength) {
            this.character.hit(hitStrength);
            this.statusBar.setHealth(this.character.energy);
    }


    bottleHitEnemy(enemy) {
        this.throwableObject.forEach((salsaBottle) => {
                if (enemy.isCollidiong(salsaBottle) &&
                enemy.lastTime(enemy.lastHit, enemy.hurtWaitingTime) == false) {
                    enemy.hit('20');
                    this.healthBarEndboss.setHealth(enemy.energy);
                }
        })
    }


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

            // ----------- Space for transparent IMG ------------
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

        // draw wir immer wieder aufgerufen // this wird in der requestAnimationFrame nicht erkannt
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
        hideLoadingScreen();
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo, i) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        } if (i == 'text') {
            mo.write(this.ctx, i)
        } else {
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
        } if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}