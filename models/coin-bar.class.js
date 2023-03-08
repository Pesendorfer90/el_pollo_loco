class CoinBar extends DrawableObject {

    IMAGES_COINBAR = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    coins = 0;


    constructor() {
        super();
        this.loadImages(this.IMAGES_COINBAR);
        this.x = 300;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setCoins(0);
    }

    setCoins(coins) {
        this.coins = coins;
        let path = this.IMAGES_COINBAR[this.resolveImagesIndex()];
        this.img = this.imageCache[path];
    }

    resolveImagesIndex() {
        if (this.coins == 0) {
            return 0;
        } else if (this.coins == 20) {
            return 1;
        } else if (this.coins == 40) {
            return 2;
        } else if (this.coins == 60) {
            return 3;
        } else if (this.coins == 80) {
            return 4;
        } else {
            return 5;
        };
    }
}