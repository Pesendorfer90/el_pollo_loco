class Level {
    allEnemies = [];
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coin;
    salsaBottle;
    level_end_x = 2250;

    constructor(enemies, endboss, clouds, backgroundObjects, coin, salsaBottle) {
        this.endboss = endboss;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.salsaBottle = salsaBottle;
        this.allEnemiesArraay();
    }
    
    
    allEnemiesArraay() {
        this.enemies.forEach(enemy => {
            this.allEnemies.push(enemy)
        });
        this.endboss.forEach(endboss => {
            this.allEnemies.push(endboss)
        });

    }
}