/**
 * Represents a SalsaBottleBar object in the game.
 * @extends DrawableObject
 */
class SalsaBottleBar extends DrawableObject {

    salsaBottle_sound = new Audio('audio/bottle.mp3');

    bottles = 0;


    /**
     * Creates a new instance of the SalsaBottleBar class.
     */
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


    /**
     * This function always adds +1 to the variable.
     */
    getBottle() {
        this.bottles += 1;
        this.text = this.bottles;
        startSound(this.salsaBottle_sound);
    }


    /**
     * This function always subtracts - 1 from the variable.
     */
    removeBottle() {
        this.bottles -= 1;
        this.text = this.bottles;
    }
}