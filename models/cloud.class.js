class Cloud extends MovableObject {

    constructor(min, max) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.y = 10;
        this.width = 500;
        this.height = 250;
        this.x = Math.random() * (max - min) + min;
        this.animate();
    }

    animate() {
        let animate = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
        setTimeout(() => {
        stoppableIntervalID(animate);
        }, 3000)
    }
}