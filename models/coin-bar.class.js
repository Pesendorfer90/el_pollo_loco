class CoinBar extends DrawableObject {

    coin_sound = new Audio('audio/coin.mp3');

    coins = 0;
    
    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_coin.png');
        this.x = 10;
        this.y = 45;
        this.width = 60;
        this.height = 60;
        
        this.text = this.coins;
        this.textColor = 'white';
        this.font = '28px Comic Sans MS';
        this.fontX = 70;
        this.fontY = 90;
    }


    getCoin() {
        // this.coin_sound.pause();
        this.coins += 1;
        this.text = this.coins;
        startSound(this.coin_sound);
    }
}