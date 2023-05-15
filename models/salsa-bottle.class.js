class SalsaBottle extends DrawableObject {

    constructor(SALSABOTTLE_IMAGE) {
        super().loadImage(SALSABOTTLE_IMAGE);
        this.x = 200 + Math.random() * 1750;
        this.y = 345;
        this.width = 40;
        this.height = 70;
    }
}