class CoinBar extends DrawableObject {

    // IMAGES_COINBAR = [
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
    //     'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    // ];

    coin_sound = new Audio('audio/coin.mp3');

    coins = 0;


    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_coin.png');
        this.x = 10;
        this.y = 35;
        this.width = 60;
        this.height = 60;
        // this.setCoins(0);
    }

    getCoin() {
        this.coin_sound.pause();
        this.coins += 20;
        console.log(this.coins);
        this.coin_sound.play();
    }

    setCoins() {
        // this.ctx.font = "30px";
        // this.ctx.fillStyle = "red";
        // this.ctx.textAlign = "center";
        this.ctx.fillText("Hello World", canvas.width / 2, canvas.height / 2);
        // let path = this.IMAGES_COINBAR[this.resolveImagesIndex()];
        // this.img = this.imageCache[path];
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