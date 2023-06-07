/**
 * Represents a GameOver object in the game.
 * @extends DrawableObject
 */
class GameOver extends DrawableObject {

    IMAGE_GAMEOVER = 'img/9_intro_outro_screens/game_over/game over.png';


    /**
     * Creates a new instance of the GameOver class.
     */
    constructor() {
        super();
        this.loadImage(this.IMAGE_GAMEOVER);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}