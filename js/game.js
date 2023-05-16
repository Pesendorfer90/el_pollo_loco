let canvas;
let world
let keyboard = new Keyboard();
let doomEventListener;
let gameStarted = false;
let playSound = false;
let checkFullScreen = false;
let intervalIds = [];
let intro_music = new Audio('audio/Intro-guitar-quieter.mp3')
let game_music = new Audio('audio/game-music-quieter.mp3')



function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
}


doomEventListener = document.addEventListener("DOMContentLoaded", function () {
    let $ = (e) => document.querySelector(e);
    let dots = $(".dots");
    animateLoadingScreen(dots, 'dots--animate');
    touch();
    doomEventListener = '';
});


window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39 || event.keyCode == 68) {
        keyboard.RIGHT = true;
    }


    if (event.keyCode == 37 || event.keyCode == 65) {
        keyboard.LEFT = true;
    }


    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }


    if (event.keyCode == 16) {
        keyboard.THROW = true;
    }
})


window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39 || event.keyCode == 68) {
        keyboard.RIGHT = false;
    }


    if (event.keyCode == 37 || event.keyCode == 65) {
        keyboard.LEFT = false;
    }


    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }


    if (event.keyCode == 16) {
        keyboard.THROW = false;
    }
});


function touch() {
    document.getElementById('btnRight').addEventListener("touchstart", () => {
        event.preventDefault();
        keyboard.RIGHT = true;
    });


    document.getElementById('btnRight').addEventListener("touchend", () => {
        event.preventDefault();
        keyboard.RIGHT = false;
    });


    document.getElementById('btnLeft').addEventListener("touchstart", () => {
        event.preventDefault();
        keyboard.LEFT = true;
    });


    document.getElementById('btnLeft').addEventListener("touchend", () => {
        event.preventDefault();
        keyboard.LEFT = false;
    });


    document.getElementById('btnThrow').addEventListener("touchstart", () => {
        event.preventDefault();
        keyboard.THROW = true;
    });


    document.getElementById('btnThrow').addEventListener("touchend", () => {
        event.preventDefault();
        keyboard.THROW = false;
    });


    document.getElementById('btnJump').addEventListener("touchstart", () => {
        event.preventDefault();
        keyboard.SPACE = true;
    });


    document.getElementById('btnJump').addEventListener("touchend", () => {
        event.preventDefault();
        keyboard.SPACE = false;
    });
}


function animateLoadingScreen(element, className) {
    $ = (e) => document.querySelector(e);
    dots = $(".dots");
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
        setTimeout(() => {
            animateLoadingScreen(element, className);
        }, 500);
    }, 2500);
}


function hideLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('display-none');
}


function startScreenClicked() {
    world.level.enemies.forEach(chicken => {
        chicken.animate();
    });
    gameStarted = true;
    chooseMusic();
    world.character.characterMovement = true;
    document.getElementById('startButton').classList.add('display-none');
    document.getElementById('emptySpaceLeft').classList.add('empty-space-toggle');
    document.getElementById('emptySpaceRight').classList.add('empty-space-toggle');
}


function switchSound() {
    soundImg = document.getElementById('muteOnOff');
    if (playSound) {
        soundImg.src = 'img/index-img/mute.png';
        playSound = false;
        stopSound(intro_music);
        stopSound(game_music);
    } else {
        soundImg.src = 'img/index-img/speaker.png';
        playSound = true;
        chooseMusic();
    }
}


function startSound(sound) {
    if (playSound) {
        sound.play();
    }
}


function stopSound(sound) {
    sound.pause();
}


function chooseMusic() {
    if (gameStarted) {
        startSound(game_music);
        stopSound(intro_music);
    } else {
        startSound(intro_music);
        stopSound(game_music);
    }
}


function showInfo() {
    document.getElementById('infoContainer').classList.remove('display-none')
}


function closeInfo() {
    document.getElementById('infoContainer').classList.add('display-none')
}


function fullScreen() {
    let fullScreenContent = document.getElementById('fullScreenContainer');
    if (checkFullScreen) {
        closeFullscreen(fullScreenContent)
        checkFullScreen = false;
    } else {
        openFullscreen(fullScreenContent);
        checkFullScreen = true;
    }
}


function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}


function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}


function reloadGame() {

}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


function stopGame() {
    intervalIds.forEach(clearIntarval);
}
