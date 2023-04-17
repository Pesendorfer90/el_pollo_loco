class Chicken extends MovableObject {


    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png',
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING)
        this.loadImages(this.IMAGE_DEAD);
        this.y = 360;
        this.height = 50;
        this.width = 50;
        this.x = 350 + Math.random() * 2300;
        this.speed = 0.12 + Math.random() * 1.65;
        this.energy = 100;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimationLoop(this.IMAGE_DEAD);
            } else {
                this.playAnimationLoop(this.IMAGES_WALKING);
            }
        }, 80)
    }
}

