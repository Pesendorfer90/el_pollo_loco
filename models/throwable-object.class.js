class ThrowableObject extends MovableObject {

    IMAGES_BOTTLES = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    constructor(x, y) {
        // super().loadImages(this.IMAGES_BOTTLES)
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png')
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        this.throw();
    }

    throw() {
        this.speedY = 10;
        this.applyGravitiy();
        setInterval(() => {
            this.x += 2.5;
        }, 5)
    }


}