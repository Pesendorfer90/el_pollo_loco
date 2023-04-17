class Coin extends DrawableObject {

    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 200 + Math.random() * 1800;
        this.y = 330;
        this.width = 100;
        this.height = 100;
    }
}