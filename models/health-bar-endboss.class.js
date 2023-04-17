class HealthBarEndboss extends DrawableObject {

    IMAGES_HEALTH = [
        'img/7_statusbars/2_statusbar_endboss/0.png',
        'img/7_statusbars/2_statusbar_endboss/20.png',
        'img/7_statusbars/2_statusbar_endboss/40.png',
        'img/7_statusbars/2_statusbar_endboss/60.png',
        'img/7_statusbars/2_statusbar_endboss/80.png',
        'img/7_statusbars/2_statusbar_endboss/100.png'
    ];

    energy = 100;


    constructor() {
        super();
        this.loadImages(this.IMAGES_HEALTH);
        this.x = 510;
        this.y = -10;
        this.width = 200;
        this.height = 60;
        this.setHealth(100);
    }

    setHealth(health) {
        this.health = health;
        let path = this.IMAGES_HEALTH[this.resolveImagesIndex()];
        this.img = this.imageCache[path];
    }

    resolveImagesIndex() {
        if (this.health == 100) {
            return 5;
        } else if (this.health == 80) {
            return 4;
        } else if (this.health == 60) {
            return 3;
        } else if (this.health == 40) {
            return 2;
        } else if (this.health == 20) {
            return 1;
        } else {
            return 0;
        };
    }

}