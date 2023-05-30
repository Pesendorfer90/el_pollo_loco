class ChickenBaby extends MovableObject {

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    chickenDead_sound = new Audio('audio/baby-chicken.mp3');
    soundPlayed = false;
    lastJump;


    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING)
        this.y = 370;
        this.height = 40;
        this.width = 40;
        this.x = 350 + Math.random() * 1750;
        this.speed = 0.12 + Math.random() * 1.65;
        this.jumpY = 12;
        this.energy = 100;
        this.randomJump = 0.5 + Math.random() * 4;
        this.applyGravity();
        this.hitStrength = 5;
    }

    animate() {
        let animate = setInterval(() => {
            if (this.isDead()) {
                if (!this.soundPlayed) {
                    this.soundPlayed = true;
                    startSound(this.chickenDead_sound);
                }
                this.loadImage('img/3_enemies_chicken/chicken_small/2_dead/dead.png');
            } else {
                this.playAnimationLoop(this.IMAGES_WALKING);
            }
        }, 80)
        stoppableIntervalID(animate);
    }


    startMovement() {
        let movement = setInterval(() => {
            if (!this.isDead()) {
                this.moveLeft();
                if (!this.isAboveGround() && this.lastTime(this.lastJump, this.randomJump) == false) {
                    this.jumpRandom()
                }
            }
        }, 1000 / 60)
        stoppableIntervalID(movement);
    }


    jumpRandom() {
        this.jump(this.jumpY)
        this.lastJump = new Date().getTime()
    }
}

