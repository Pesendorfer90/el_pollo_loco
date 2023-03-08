class World {

    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    coinBar = new CoinBar();

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
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
            // bottleCollision();
        }, 200)

    }

    enemyCollision() {
        // setInterval(() => {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isCollidiong(enemy)) {
                this.character.hit();
                this.statusBar.setHealth(this.character.energy);
            }
        })
        // }, 200)
    }
    coinCollision() {
        this.level.coin.forEach((coin, i) => {
            if (this.character.isCollidiong(coin)) {
                this.character.getCoin();
                this.coinBar.setCoins(this.character.coins);
                // console.log([i]);
                // function for animate the coin away
                this.remove('this.level.coin', i)
            }
        })
    }
    // bottleCollision();

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.backgroundObjects);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.coin);

        this.ctx.translate(-this.camera_x, 0);
        // ----------- Space for fixed objects --------------
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
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


    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);


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