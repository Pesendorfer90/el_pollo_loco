class Character extends MovableObject {

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_DEAD = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png'
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
    lastThrow;
    idle = false;
    idleIntveral;
    throwWaitingTime = 0.85;


    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_IDLE_LONG);
        this.height = 280;
        this.width = 100;
        this.y = 140;
        this.speed = 5;
        this.jumpY = 16;
        this.animate();
        this.movement();
        this.applyGravitiy();
        this.stayOnGround();
        this.hurtWaitingTime = 0.85;
    }


    movement() {
        setInterval(() => {
            if (this.characterMovement) {
                stopSound(this.walking_sound);
                this.characterMoveRight();
                this.characterMoveLeft();
                this.characterJump();
                this.characterThrow();
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60)
    }


    characterMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            startSound(this.walking_sound);
        }
    }


    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            startSound(this.walking_sound);
        }
    }


    characterJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump(this.jumpY);
            startSound(this.jumping_sound);
        }
    }


    characterThrow() {
        if (this.world.keyboard.THROW) {
            if (this.lastTime(this.lastThrow, this.throwWaitingTime) == false) {
                this.throwBottle();
            }
        }
    }


    animate() {
        setInterval(() => {
            if (this.characterMovement) {
                if (this.isDead() && !this.characterDead) {
                    this.characterAnimationDead();
                } else if (this.lastTime(this.lastHit, this.hurtWaitingTime)) {
                    this.characterAnimationHurt();
                } else if (this.isAboveGround()) {
                    this.characterAnimationJump();
                } else {
                    this.walkOrIdle();
                }
            }
        }, 1000 / 20)
    }


    characterAnimationDead() {
        this.characterDead = true;
        this.characterMovement = false;
        this.deadAnimation(5);
        this.youLost();
        this.resetIdle();
    }


    characterAnimationHurt() {
        this.playHurtSound();
        this.playAnimationLoop(this.IMAGES_HURT);
        this.resetIdle();
    }


    characterAnimationJump() {
        this.jumpAnimation();
        this.resetIdle();
    }

    walkOrIdle() {
        if (this.world.keyboard.RIGHT && this.characterJumping == false ||
            this.world.keyboard.LEFT && this.characterJumping == false) {
            this.characterAnimationWalk();
        } else if (!this.idle) {
            this.idleAnimation();
        }
    }


    characterAnimationWalk() {
        this.playAnimationLoop(this.IMAGES_WALKING);
        this.resetIdle();
    }


    throwBottle() {
        if (world.salsaBottleBar.bottles) {
            let bottle = new ThrowableObject(world.character.x + 35, world.character.y + 110);
            world.throwableObject.push(bottle);
            this.lastThrow = new Date().getTime();
        }
    }


    playHurtSound() {
        let energy = this.energy
        if (/5/.test(energy)) {
            startSound(this.hurt_sound1);
        } else {
            startSound(this.hurt_sound2);
        }
    }


    jumpAnimation() {
        if (this.speedY >= +15) {
            this.loadImage('img/2_character_pepe/3_jump/J-33.png');
        } if (this.speedY >= +3) {
            this.loadImage('img/2_character_pepe/3_jump/J-34.png');
        } if (this.speedY <= +3) {
            this.loadImage('img/2_character_pepe/3_jump/J-35.png');
        } if (this.speedY <= -2) {
            this.loadImage('img/2_character_pepe/3_jump/J-36.png');
        } if (this.speedY <= -3) {
            this.loadImage('img/2_character_pepe/3_jump/J-37.png');
        } if (this.speedY <= -13) {
            this.loadImage('img/2_character_pepe/3_jump/J-38.png');
        }
    }


    idleAnimation() {
        this.idle = true;
        let i = 0;
        this.idleIntveral = setInterval(() => {
            i++;
            if (i < 9) {
                this.playAnimationLoop(this.IMAGES_IDLE);
            } else {
                this.playAnimationLoop(this.IMAGES_IDLE_LONG);
            }
        }, 250)
    }


    resetIdle() {
        clearInterval(this.idleIntveral);
        this.idle = false;
    }


    setStandardImg() {
        this.loadImage('img/2_character_pepe/3_jump/J-39.png');
    }
}