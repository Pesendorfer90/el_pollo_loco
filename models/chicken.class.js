class Chicken extends MovableObject {

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    chickenDead_sound = new Audio('audio/chicken.mp3');
    soundPlayed = false;


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING)
        this.y = 360;
        this.height = 50;
        this.width = 50;
        this.x = 350 + Math.random() * 1750;
        this.speed = 0.12 + Math.random() * 1.65;
        this.energy = 100;
    }


    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60)
        setInterval(() => {
            if (this.isDead()) {
                if (!this.soundPlayed) {
                    this.soundPlayed = true;
                    startSound(this.chickenDead_sound);
                }
                this.loadImage('img/3_enemies_chicken/chicken_normal/2_dead/dead.png');
            } else {
                this.playAnimationLoop(this.IMAGES_WALKING);
            }
        }, 80)
    }
}

