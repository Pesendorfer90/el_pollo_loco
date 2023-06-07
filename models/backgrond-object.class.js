/**
 * Represents a background object in the game.
 *  @extends DrawableObject
 */
class BackgroundObject extends DrawableObject {
    width = 720;
    height = 480;


    /**
     * Constructs a new BackgroundObject instance.
     * @param {string} imagePath - The path to the image of the background object.
     * @param {number} x - The initial x-coordinate of the background object.
     * @param {number} y - The initial y-coordinate of the background object.
     */
    constructor(imagePath, x, y) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}