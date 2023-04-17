class Character extends MovableObject {

    height = 280;
    width = 100;
    y = 140;
    speed = 5;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        // 'img/2_character_pepe/3_jump/J-31.png',
        // 'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
        'img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        // 'img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png',
    ]

    IMAGES_IDLE_LONG = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ]

    world;
    walking_sound = new Audio('audio/run.mp3');
    jumping_sound = new Audio('audio/jump.mp3');
    hurt_sound1 = new Audio('audio/hurt1.mp3');
    hurt_sound2 = new Audio('audio/hurt2.mp3');

    characterDead = false;
    characterJumping = false;
    characterMovement = false;
    movementInterval;
    animateInterval;
    intervalJump;
    jumpCounter;
    lastThrow;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.animate();
        this.applyGravitiy();
    }


    animate() {
        setInterval(() => {
            if (this.characterMovement) {
                this.walking_sound.pause();
                if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                    this.moveRight();
                    this.otherDirection = false;
                    this.walking_sound.play();
                    // console.log(this.x)
                }

                if (this.world.keyboard.LEFT && this.x > 0) {
                    this.moveLeft();
                    this.otherDirection = true;
                    this.walking_sound.play();
                }

                if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                    this.jump();
                    this.jumping_sound.play();
                }

                if (this.world.keyboard.THROW) {
                    if (this.lastTimeThrow() == false) {
                        this.throwBottle();
                    }
                }
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)


        setInterval(() => {
            if (this.characterMovement) {
                if (this.isDead() && !this.characterDead) {
                    this.characterDead = true;
                    this.characterMovement = false;
                    this.deadAnimation(5);
                    this.youLost();
                } else if (this.isHurt() && !this.characterDead) {
                    this.playHurtSound();
                    this.playAnimationLoop(this.IMAGES_HURT);
                } else if (this.isAboveGround() && this.characterDead == false && this.characterJumping == false) {
                    this.jumpAnimation();
                } else {

                    if (this.world.keyboard.RIGHT && this.characterJumping == false ||
                        this.world.keyboard.LEFT && this.characterJumping == false) {
                        this.playAnimationLoop(this.IMAGES_WALKING);
                    }
                }
            }
        }, 60)

    }


    throwBottle() {
        if (world.salsaBottleBar.bottles) {
            let bottle = new ThrowableObject(world.character.x + 35, world.character.y + 110);
            world.throwableObject.push(bottle);
            this.lastThrow = new Date().getTime();
        }
    }


    lastTimeThrow() {
        let timepassed = new Date().getTime() - this.lastThrow; // Difference in ms
        timepassed = timepassed / 1000 // Difference in sec
        return timepassed < 0.5;
    }


    playHurtSound() {
        let energy = this.energy
        if (/5/.test(energy)) {
            this.hurt_sound1.play();
        } else {
            this.hurt_sound2.play();
        }
    }


    jumpAnimation() {
        this.characterJumping = true;

        this.jumpCounter = 0;
        this.intervalJump = setInterval(() => {
            if (this.jumpCounter >= 7) {
                clearInterval(this.intervalJump);
                this.characterJumping = false;
            } else {
                this.playAnimationLoop(this.IMAGES_JUMPING);
                this.jumpCounter++;
            }
        }, 90);
    }
}