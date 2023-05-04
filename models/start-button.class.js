class StartButton extends DrawableObject {

    IMAGE_BUTTON = 'img/9_intro_outro_screens/start/start.png';



    constructor() {
        super();
        this.loadImage(this.IMAGE_BUTTON);
        this.x = 275;
        this.y = 40;
        this.width = 170;
        this.height = 74;
    }
}