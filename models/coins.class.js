/**
 * Class representing a Coin object.
 * @extends DrawableObject
 */
class Coin extends DrawableObject {


    /**
     * Creates an instance of Coin.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 1750;
        this.y = 370;
        this.width = 40;
        this.height = 40;
    }
}