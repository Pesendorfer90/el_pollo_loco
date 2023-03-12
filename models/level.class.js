class Level {
    enemies;
    clouds;
    backgroundObjects;
    coin;
    salsaBottle;
    level_end_x = 2250;

    constructor(enemies, clouds, backgroundObjects, coin, salsaBottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
        this.salsaBottle =salsaBottle;
    }
}