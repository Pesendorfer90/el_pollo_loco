/**
 * Represents a SalsaBottle object in the game.
 * @extends DrawableObject
 */
class SalsaBottle extends DrawableObject {

    /**
     * Creates a new instance of the SalsaBottle class.
     * @param {string} SALSABOTTLE_IMAGE - img path of the salsaBottle
     */
    constructor(SALSABOTTLE_IMAGE) {
        super().loadImage(SALSABOTTLE_IMAGE);
        this.x = 200 + Math.random() * 1750;
        this.y = 345;
        this.width = 40;
        this.height = 70;
    }
}