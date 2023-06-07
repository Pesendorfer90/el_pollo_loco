/**
 * Represents a Cloud object in the game.
 * @extends MoveableObject
 */
class Cloud extends MovableObject {


    /**
     * Creates an instance of Cloud.
     */
    constructor(min, max) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.y = 10;
        this.width = 500;
        this.height = 250;
        this.x = Math.random() * (max - min) + min;
        this.animate();
    }


    /**
     * Function to animate the Cloud.
     */
    animate() {
        let animate = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
            stoppableIntervalID(animate);
    }
}