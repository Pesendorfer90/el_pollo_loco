class GameOver extends DrawableObject {

    IMGAGE_LOST = 'img/9_intro_outro_screens/game_over/you lost.png';
    IMAGE_GAMEOVER = 'img/9_intro_outro_screens/game_over/game over.png';
    constructor() {
        super().loadImage(this.IMGAGE_LOST);
        this.loadImage(this.IMAGE_GAMEOVER);
        this.x = 0;
        this.y= 0;
        this.width = 720;
        this.height = 480;
        this.alpha = 0;
        // this.characterLost();
    }

    characterLost() {
        // if (this.characterDead) {
            setTimeout(() => {
                setInterval(() => {
                    this.ctx.drawImage(this.IMAGE_LOST, this.x, this.y, this.width, this.height);
                    this.ctx.globalAlpha = alpha;
                    alpha += 0.01;
                }, 1000 / 60)
            }, 1000)
        // }
    }


    characterWin() {

    }
}