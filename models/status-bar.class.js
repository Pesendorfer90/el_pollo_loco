class StatusBar extends DrawableObject {

    IMGAES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
    ];

    health = 100;


    constructor() {
        super();
        this.loadImages(this.IMGAES_HEALTH);
        this.x = 30;
        this.y = 0;
        this.width = 200;
        this.height = 60;
        this.setHealth(100);
    }

    setHealth(health) {
        this.health = health;
        let path = this.IMGAES_HEALTH[this.resolveImagesIndex()];
        this.img = this.imageCache[path];
    }

    resolveImagesIndex() {
        if (this.health == 100) {
            return 5;
        } else if (this.health > 80) {
            return 4;
        } else if (this.health > 60) {
            return 3;
        } else if (this.health > 40) {
            return 2;
        } else if (this.health > 20) {
            return 1;
        } else {
            return 0;
        };
    }

}