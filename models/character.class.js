/**
 * Class representing a Character object.
 * @extends MoveableObject
 */
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
    k = 1;


    /**
     * Creates an instance of Character.
     */
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
        this.speed = 6;
        this.jumpY = 16;
        this.applyGravity();
        this.stayOnGround();
        this.hurtWaitingTime = 0.85;
        this.movement();
        this.animate();
    }


    /**
     * Starts functions for moving the character.
     */
    movement() {
        let movement = setInterval(() => {
            if (this.characterMovement) {
                stopSound(this.walking_sound);
                this.characterMoveRight();
                this.characterMoveLeft();
                this.characterJump();
                this.characterThrow();
            }
            this.world.camera_x = -this.x + 100;
        }, 20);
        stoppableIntervalID(movement);
    }


    /**
     * Function to move the character to the right.
     * Processes the input with the left arrow key or the A key.
     * Movement limitation until the end of the level.
     */
    characterMoveRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            startSound(this.walking_sound);
        }
    }


    /**
     * Function to move the character to the left when the corresponding key is pressed.
     * Processes the input with the right arrow key or the D key.
     * Movement limitation at the start to the left.
     */
    characterMoveLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            startSound(this.walking_sound);
        }
    }


    /**
     * Function to make the character jump.
     * Processes input from the spacebar.
     * Execute only when character is on the ground.
     */
    characterJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump(this.jumpY);
            startSound(this.jumping_sound);
        }
    }


    /**
     * Function to throw a bottle.
     * Processes the input with the SHIFT key.
     * Only executed when the waiting time from the last start is over.
     */
    characterThrow() {
        if (this.world.keyboard.THROW) {
            if (this.lastTime(this.lastThrow, this.throwWaitingTime) == false) {
                this.throwBottle();
            }
        }
    }


    /**
     * Function to animate the character.
     */
    animate() {
        let animate = setInterval(() => {
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
        }, 50);
        stoppableIntervalID(animate);
    }


    /**
     * Function that starts when the character dies.
     */
    characterAnimationDead() {
        this.characterDead = true;
        this.characterMovement = false;
        this.deadAnimation(5);
        this.jump(this.jumpY)
        this.youLost();
        this.resetIdle();
    }


    /**
     * Function that starts when the character gets hurt.
     */
    characterAnimationHurt() {
        this.playHurtSound();
        this.playAnimationLoop(this.IMAGES_HURT);
        this.resetIdle();
    }


    /**
     * Function that starts when jumps
     */
    characterAnimationJump() {
        this.jumpAnimation();
        this.resetIdle();
    }


    /**
     * Function that determines whether the character walks or stands still.
     */
    walkOrIdle() {
        if (this.world.keyboard.RIGHT && this.characterJumping == false ||
            this.world.keyboard.LEFT && this.characterJumping == false) {
            this.characterAnimationWalk();
        } else if (!this.idle) {
            this.idleAnimation();
        }
    }


    /**
     * Function that starts when the character moves left or right.
     */
    characterAnimationWalk() {
        this.playAnimationLoop(this.IMAGES_WALKING);
        this.resetIdle();
    }


    /**
     * This function adds a new Throwable object and saves the time.
     */
    throwBottle() {
        if (world.salsaBottleBar.bottles) {
            let bottle = new ThrowableObject(world.character.x + 35, world.character.y + 110);
            world.throwableObject.push(bottle);
            this.lastThrow = new Date().getTime();
        }
    }


    /**
     * This function decides what sound to play when the character gets hurt.
     */
    playHurtSound() {
        let energy = this.energy
        if (/5/.test(energy)) {
            startSound(this.hurt_sound1);
        } else {
            startSound(this.hurt_sound2);
        }
    }


    /**
     * This function loads the corresponding image for different speedY values.
     */
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


    /**
     * This function plays animations when the character is idle.
     */
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


    /**
     * This function clears the idle interval.
     */
    resetIdle() {
        clearInterval(this.idleIntveral);
        this.idle = false;
    }


    /**
     * This function loads the character's default image.
     */
    setStandardImg() {
        this.loadImage('img/2_character_pepe/3_jump/J-39.png');
    }
}