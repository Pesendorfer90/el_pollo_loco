/**
 * Represents a SartScreen object in the game.
 * @extends DrawableObject
 */
class StartScreen extends DrawableObject {

    IMAGE_START = 'img/9_intro_outro_screens/start/startscreen_1.png';


    /**
     * Creates a new instance of the StartScreen class.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGE_START);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }


    
}