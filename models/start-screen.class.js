class StartScreen extends DrawableObject {

    IMAGE_START = 'img/9_intro_outro_screens/start/startscreen_1.png';



    constructor() {
        super();
        this.loadImage(this.IMAGE_START);
        this.x = 0;
        this.y = 0;
        this.width = 720;
        this.height = 480;

        this.text = 'START';
        this.textColor = 'red';
        this.font = '40px Comic Sans MS';
        this.fontX = 290;
        this.fontY = 90;
        this.startGame;

        canvas.addEventListener("click", this.handleCanvasClick.bind(this));
    }

    handleCanvasClick(event) {
        console.log('listener works')
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (
            mouseX >= this.fontX &&
            mouseX <= this.fontX + 100 &&
            mouseY >= this.fontY &&
            mouseY <= this.fontY + 40
        ) {
            this.startScreenClicked();
        }
    }

    startScreenClicked() {
        console.log('angeklickt')
    }

}