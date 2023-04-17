class ThrowableObject extends MovableObject {

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.loadImages(this.IMAGES_BOTTLES)
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.throw();
    }

    throw() {
            this.speedY = 12;
            this.applyGravitiy();
            setInterval(() => {
                this.x += 3.5;
            }, 5)
            this.animate();
            world.salsaBottleBar.removeBottle();        
            setTimeout(() => {
            world.level.salsaBottle.splice(0, 1);
        },)
    }


        animate() {
            setInterval(() => {
                this.playAnimationLoop(this.IMAGES_BOTTLES);
            }, 70)
        }


    
}