class GameOver extends DrawableObject {

    IMGAGE_LOST = 'img/9_intro_outro_screens/game_over/you lost.png';
    IMAGE_GAMEOVER = 'img/9_intro_outro_screens/game_over/game over.png';

    constructor(image) {
        super().loadImage(image);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}