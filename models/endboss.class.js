class Endboss extends MovableObject {

    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    bigChickenHurt_sound = new Audio('audio/big-chicken-hurt.mp3');

    endbossDead = false;
    animateEndboss = false;
    animationIndex;

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.height = 420;
        this.width = 300;
        this.y = 20;
        this.x = 2500;
        this.speed = 4.5;
        this.energy = 100;
        this.hurtWaitingTime = 0.85;
        this.hitStrength = 25;
        this.animate();
    }



    animate() {
        setInterval(() => {
            if (this.animateEndboss) {
                this.introAnimation();
                this.hurtAnimation();
                this.isDeadAnimation();
                this.attackAnimation();
                this.animationIndex++
            }
            if (world.character.x > 1900 && !this.animateEndboss && !this.endbossDead) {
                this.startEndbossIntro()
            }
        }, 120)
    }


    introAnimation() {
        if (this.animationIndex < 35) {
            this.walkIn();
        }
        if (this.animationIndex < 43 && this.animationIndex > 35) {
            this.alertIntro();
        }
    }


    walkIn() {
        this.playAnimationLoop(this.IMAGES_WALKING);
        this.moveLeft();
    }


    alertIntro() {
        this.playAnimationLoop(this.IMAGES_ALERT);
        world.character.characterMovement = true;
    }


    hurtAnimation() {
        if (this.lastTime(this.lastHit, this.hurtWaitingTime) && !this.isDead()) {
            startSound(this.bigChickenHurt_sound);
            this.playAnimationLoop(this.IMAGES_HURT);
        }
    }


    isDeadAnimation() {
        if (this.isDead() && !this.endbossDead) {
            this.endbossDead = true;
            this.deadAnimation(2);
            this.gameOver();
            world.character.characterMovement = false;
            this.animateEndboss = false;
        }
    }


    attackAnimation() {
        if (this.animationIndex > 43 && !this.lastTime(this.lastHit, this.hurtWaitingTime)) {
            this.playAnimationLoop(this.IMAGES_ATTACK);
            if (this.checkDirection() == true) {
                this.moveLeft();
                this.otherDirection = false;
            } else {
                this.moveRight();
                this.otherDirection = true;
            }
        }
    }


    startEndbossIntro() {
        this.animationIndex = 0;
        this.animateEndboss = true;
        world.character.characterMovement = false;
        this.fadeInImg('alphaEndbossHealthBar');
        world.character.setStandardImg();
    }


    checkDirection() {
        return world.character.x + (world.character.width / 2) < this.x + (this.width / 2);
    }
}