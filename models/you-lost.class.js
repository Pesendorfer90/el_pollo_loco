class YouLost extends DrawableObject {

    IMGAGE_LOST = 'img/9_intro_outro_screens/game_over/you lost.png';

    constructor() {
        super();
        this.loadImage(this.IMGAGE_LOST);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;
    }
}