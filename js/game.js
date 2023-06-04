let canvas;
let world;
let keyboard = new Keyboard();
let doomEventListener;
let gameStarted = false;
let playSound = false;
let checkFullScreen = false;
let intervalIds = [];
let intro_music = new Audio('audio/Intro-guitar-quieter.mp3');
let game_music = new Audio('audio/game-music-quieter.mp3');
let userAgent = navigator.userAgent;
let browserName;
let level1;
let firstGame = true;


/**
 * Load objects, detect browser and hide loading screen.
 */
function init() {
    loadLevel();
    canvas = document.getElementById('canvas');
    fnBrowserDetect();
    world = new World(canvas, keyboard);
    if (firstGame) {
        hideLoadingScreen();
    }
}


/**
 * wait for content and start animated loading screen.
 */
doomEventListener = document.addEventListener("DOMContentLoaded", function () {
    let $ = (e) => document.querySelector(e);
    let dots = $(".dots");
    animateLoadingScreen(dots, 'dots--animate');
    touch();
    doomEventListener = '';
});


/**
 * Animate the loading screen.
 * @param {string} element - This is the id of the dots
 * @param {string} className - This is the style class for the animation
 */
function animateLoadingScreen(element, className) {
    $ = (e) => document.querySelector(e);
    dots = $(".dots");
    element.classList.add(className);
    setTimeout(() => {
        element.classList.remove(className);
        setTimeout(() => {
            animateLoadingScreen(element, className);
        }, 500);
    }, 2000);
}


/**
 * Remove display-none to show loadingscreen.
 */
function showLoadingScreen() {
    document.getElementById('loadingScreen').classList.remove('display-none');
}


/**
 * Add display-none to hide loadingscreen.
 */
function hideLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('display-none');
}


/**
 * when start is clicked, the animation of the enemies and the character is activated.
 * Add display-none to hide start butoon.
 * Move the buttons to the middle.
 */
function startScreenClicked() {
    world.level.enemies.forEach(enemy => {
        enemy.animate();
        enemy.startMovement();
    });
    gameStarted = true;
    chooseMusic();
    world.character.characterMovement = true;
    document.getElementById('startButton').classList.add('display-none');
    document.getElementById('emptySpaceLeft').classList.add('empty-space-toggle');
    document.getElementById('emptySpaceRight').classList.add('empty-space-toggle');
}


/**
 * toggles between mute or play when the button is clicked
 */
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


/**
 * Starts audio playback.
 * @param {audio path} sound 
 */
function startSound(sound) {
    if (playSound) {
        sound.play();
    }
}


/**
 * Stops the audio playback.
 * @param {audio path} sound 
 */
function stopSound(sound) {
    sound.pause();
}


/**
 * decide what music is played (startscreen or game)
 */
function chooseMusic() {
    if (gameStarted) {
        startSound(game_music);
        stopSound(intro_music);
    } else {
        startSound(intro_music);
        stopSound(game_music);
    }
}


/**
 * Removes display none and shows game information.
 */
function showInfo() {
    document.getElementById('infoContainer').classList.remove('display-none')
}


/**
 * RAdd display none and hide game information.
 */
function closeInfo() {
    document.getElementById('infoContainer').classList.add('display-none')
}


/**
 * Enables or disables fullscreen mode for the Container.
 */
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


/**
 * Activates the full screen mode.
 * @param {ID} elem 
 */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen();
    }
}


/**
 * Disables full screen mode.
 */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}


/**
 * Restart the game.
 */
function reloadGame() {
    firstGame = false;
    showLoadingScreen();
    hideTryAgain();
    stopGame();
}


/**
 * function to push intervals into an array
 * @param {intervall ID} id 
 */
function stoppableIntervalID(id) {
    intervalIds.push(id);
}


/**
 * Stops all intervals from this array.
 * Then the game restarts.
 */
function stopGame() {
    let i = 0;
    intervalIds.forEach(interval => {
        clearInterval(interval);
        i++;
        if (i == (intervalIds.length - 1)) {
            init();
            // setTimeout(() => {
                startScreenClicked();
                hideLoadingScreen();
            // }, 1000)
        }
    })
}


/**
 * Add display-none to hide "Try again" butoon.
 */
function hideTryAgain() {
    document.getElementById('reload').classList.add('display-none')
}


/**
 * When the browser firefox is detected,
 * display-none is removed from a div to display a message.
 */
function fnBrowserDetect() {
    if (userAgent.match(/firefox|fxios/i)) {
        browserName = "firefox";
        document.getElementById('firefoxSuck').classList.remove('display-none');
    }
}