class Level {
    enemies;
    clouds;
    backgroundObjects;
    coin;
    level_end_x = 2250;

    constructor(enemies, clouds, backgroundObjects, coin) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coin = coin;
    }
}