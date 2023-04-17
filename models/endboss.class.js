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
    hadFirstContact;

    constructor() {
        super().loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.height = 420;
        this.width = 300;
        this.y = 20;
        this.x = 2500;
        this.speed = 2.5;
        this.energy = 100;
        this.animate();
    }



    animate() {
        let hadFirstContact = false;

        let i = 0;
        setInterval(() => {
            if (i < 10) {
                this.playAnimationLoop(this.IMAGES_WALKING);
                this.moveLeft();
            } if (i < 18) {
                this.playAnimationLoop(this.IMAGES_ALERT);
            } if (this.isHurt()) {
                console.log('endboss hurt')
                this.playAnimationLoop(this.IMAGES_HURT);
            } if (condition) {
                
            }
            
            if (this.isDead() && !this.endbossDead) {
                this.endbossDead = true;
                this.deadAnimation(3);
                this.gameOver();
            } else {
                this.playAnimationLoop(this.IMAGES_ATTACK);
                // this.followCharacter();
            }
            i++
            if (world.character.x > 1800 && !hadFirstContact) {
                i = 0;
                hadFirstContact = true;
                this.fadeInImg('alphaEndbossHealthBar');
                console.log('first contact');
            }
        }, 200)
    }
}