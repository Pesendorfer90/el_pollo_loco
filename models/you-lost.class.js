/**
 * Represents a YouLost object in the game.
 * @extends DrawableObject
 */
class YouLost extends DrawableObject {

    IMGAGE_LOST = 'img/9_intro_outro_screens/game_over/you lost.png';


    /**
     * Creates a new instance of the YouLost class.
     */
    constructor() {
        super();
        this.loadImage(this.IMGAGE_LOST);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}