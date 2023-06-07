/**
 * Represents a level in the game.
 */
class Level {
    allEnemies = [];
    enemies;
    endboss;
    clouds;
    backgroundObjects;
    coin;
    salsaBottle;
    level_end_x = 2250;


    /**
     * Creates a new instance of the Level class.
     * @param {Object} background - The background of the level.
     * @param {Object} enemies - The enemies in the level.
     * @param {Object} clouds - The clouds in the level.
     * @param {Object} coins - The coins in the level.
     * @param {Object} salsabottle - The salsabottle in the level.
     * @param {Object} throwableObjects - The throwable objects in the level.
     */
    constructor(enemies, endboss, clouds, backgroundObjects, coin, salsaBottle) {
        this.endboss = endboss;
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.salsaBottle = salsaBottle;
        this.allEnemiesArraay();
    }
    
  
    /**
     * Creat an array with all enemies.
     */
    allEnemiesArraay() {
        this.enemies.forEach(enemy => {
            this.allEnemies.push(enemy)
        });
        this.endboss.forEach(endboss => {
            this.allEnemies.push(endboss)
        });

    }
}