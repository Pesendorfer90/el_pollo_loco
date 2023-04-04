class SalsaBottleBar extends DrawableObject {

    salsaBottle_sound = new Audio('audio/bottle.mp3');

    bottles = 0;




    constructor() {
        super().loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = 100;
        this.y = 45;
        this.width = 60;
        this.height = 60;

        this.text = this.bottles;
        this.textColor = 'white';
        this.font = '28px Comic Sans MS';
        this.fontX = 160;
        this.fontY = 90;
    }


    getBottle() {
        this.salsaBottle_sound.pause();
        this.bottles += 1;
        this.text = this.bottles;
        // console.log(this.bottles);
        this.salsaBottle_sound.play();
    }
}