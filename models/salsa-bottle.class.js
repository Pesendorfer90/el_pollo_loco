class SalsaBottle extends DrawableObject {

    constructor(SALSABOTTLE_IMAGE) {
        super().loadImage(SALSABOTTLE_IMAGE);
        this.x = 200 + Math.random() * 1800;
        this.y = 320;
        this.width = 100;
        this.height = 100;
    }
}