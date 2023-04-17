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

    endbossDead = false;
    animateEndboss = false;
    animationIndex

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
        this.animate();
    }



    animate() {
        this.animationIndex = 0;

        setInterval(() => {
            if (this.animateEndboss) {
                if (this.animationIndex < 35) {
                    this.playAnimationLoop(this.IMAGES_WALKING);
                    this.moveLeft();
                    console.log(this.animationIndex, 'walk')
                } if (this.animationIndex < 43 && this.animationIndex > 35) {
                    this.playAnimationLoop(this.IMAGES_ALERT);
                    console.log(this.animationIndex, 'alert');
                    world.character.characterMovement = true;
                } if (this.isHurt() && !this.isDead()) {
                    console.log('endboss hurt')
                    this.playAnimationLoop(this.IMAGES_HURT);
                } if (this.isDead() && !this.endbossDead) {
                    this.endbossDead = true;
                    this.deadAnimation(2);
                    this.gameOver();
                    world.character.characterMovement = false;
                    this.animateEndboss = false;
                } else {
                    this.playAnimationLoop(this.IMAGES_ATTACK); // wird immer ausgeführt!!
                    // this.followCharacter();
                }
                this.animationIndex++
            }
            if (world.character.x > 1900 && !this.animateEndboss) {
                this.animationIndex = 0;
                this.animateEndboss = true;
                world.character.characterMovement = false;
                this.fadeInImg('alphaEndbossHealthBar');
                console.log('first contact');
            }
        }, 120)
    }


    stopCharacterMovement() {
        clearInterval(world.character.characterMovement);
    }
}