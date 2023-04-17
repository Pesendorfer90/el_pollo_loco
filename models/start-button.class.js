class StartButton extends DrawableObject {

    IMAGE_BUTTON = 'img/9_intro_outro_screens/start/start.png';



    constructor() {
        super();
        this.loadImage(this.IMAGE_BUTTON);
        this.x = 275;
        this.y = 40;
        this.width = 170;
        this.height = 74;
        this.startGame;

        canvas.addEventListener("click", this.handleCanvasClick.bind(this));
        canvas.addEventListener("mousemove", this.handleCanvasHover.bind(this));
    }

    handleCanvasClick(event) {
        // console.log('listener works')
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (
            mouseX >= this.x &&
            mouseX <= this.x + 170 &&
            mouseY >= this.y &&
            mouseY <= this.y + 74
        ) {
            this.startScreenClicked();
        }
    }


    handleCanvasHover(event) {
        // console.log('hover works')
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        if (
            mouseX >= this.x &&
            mouseX <= this.x + 170 &&
            mouseY >= this.y &&
            mouseY <= this.y + 74
        ) {
            this.x = 273;
            this.y = 38;
            this.width = 174;
            this.height = 78;
        } else {
            this.x = 275;
            this.y = 40;
            this.width = 170;
            this.height = 74;
        }
    }


    startScreenClicked() {
        world.level.enemies.forEach(chicken => {
            chicken.animate();
        });
        
        world.gameStarted = true;
        world.character.characterMovement = true;
    }
}