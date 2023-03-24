class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();
    salsaBottleBar = new SalsaBottleBar();

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
        this.level.enemies.forEach((enemy) => {
            this.enemyHurtCharacter(enemy);
            this.characterHurtEnemy(enemy);
        })
    }
    

    enemyHurtCharacter(enemy) {
        if (this.character.isCollidiong(enemy) &&
                this.character.isHurt() == false &&
                !enemy.isDead() &&
                this.character.isAboveGround() == false) {
                this.enemyCollides(enemy);
            }
    }


    characterHurtEnemy(enemy) {
        if (this.character.jumpOnEnemy(enemy) &&
        this.character.isAboveGround() == true &&
        this.character.isPositiv() &&
        !enemy.isDead()) {
        enemy.speed = 0;
        enemy.energy = 0;
        this.character.jump();
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


    enemyCollides(enemy) {
        if (this.character.isHurt() == false) {
//            console.log(enemy);
            this.character.hit();
            this.statusBar.setHealth(this.character.energy);
        }
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);
        this.addObjectsToMap(this.level.salsaBottle);

        this.ctx.translate(-this.camera_x, 0);
        // ----------- Space for fixed objects --------------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.coinBar, 'coin');
        this.addToMap(this.salsaBottleBar);
        this.addToMap(this.salsaBottleBar, 'bottle');
        this.ctx.translate(this.camera_x, 0);

        this.ctx.translate(-this.camera_x, 0);

        // draw wir immer wieder aufgerufen // this wird in der requestAnimationFrame nicht erkannt
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    addToMap(mo, i) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        if (i == undefined) {
            mo.draw(this.ctx);
            mo.drawFrame(this.ctx);
        } else {
            mo.write(this.ctx, i)
        }



        if (mo.otherDirection) {
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