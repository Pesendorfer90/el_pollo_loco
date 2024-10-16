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
let portrait = window.matchMedia("(orientation: portrait)");


/**
 * Load objects, detect browser and hide loading screen.
 */
function init() {
    loadLevel();
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    checkValues();
}


/**
 * Various functions for checking values.
 */
function checkValues() {
    if (firstGame) {
        setTimeout(() => {
            hideLoadingScreen();
        }, 5000)
    }
    checkMobileControll();
    fnBrowserDetect();
    checkScreenResolution();
}


/**
 * Wait for content and start animated loading screen.
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
 * When start is clicked, the animation of the enemies and the character is activated.
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
 * Toggles between mute or play when the button is clicked
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
 * @param {string} sound - Audio path of the audio to be played
 */
function startSound(sound) {
    if (playSound) {
        sound.play();
    }
}


/**
 * Stops the audio playback.
 * @param {string} sound - Audio path of the audio to be stopped
 */
function stopSound(sound) {
    sound.pause();
}


/**
 * Decide what music is played (startscreen or game)
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
 * Add display none and hide game information.
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
        setNormalSize();
        checkFullScreen = false;
    } else {
        openFullscreen(fullScreenContent);
        setFullSize();
        checkFullScreen = true;
    }
}


/**
 * Activates the full screen mode.
 * @param {string} elem - ID of the div that should activate in fullscreen
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
 * Handles changes in the fullscreen mode status and adjusts the display accordingly.
 *
 * This function checks if the document has exited fullscreen mode (i.e., no `fullscreenElement`).
 * If fullscreen mode is exited, it calls `setNormalSize()` to reset the display to normal size
 * and sets `checkFullScreen` to `false`. It also logs a message indicating that fullscreen mode has been exited.
 */
function handleFullscreenChange() {
    if (!document.fullscreenElement) {
        setNormalSize();
        checkFullScreen = false;
        console.log('Vollbildmodus verlassen');
    }
}


/**
 * Adds an event listener that listens for changes in fullscreen mode.
 *
 * This event listener listens for the `fullscreenchange` event, which is triggered whenever the browser enters or exits fullscreen mode.
 * When the event occurs, the `handleFullscreenChange` function is called to check the fullscreen status and adjust the display accordingly.
 *
 * @example
 * document.addEventListener('fullscreenchange', handleFullscreenChange);
 */
document.addEventListener('fullscreenchange', handleFullscreenChange);


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
 * Function to push setIntervals into an array
 * @param {sting} id - ID of setInterval
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
            startScreenClicked();
            hideLoadingScreen();
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
 * Check the current inner height and inner width of the browser and check the aspect ratio.
 * @returns {boolean} - True if the aspect ratio smaller, false otherwise.
 */
function checkWindowResolution() {
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    let aspectRatio = windowWidth / windowHeight;
    return aspectRatio < 3 / 2;
}


/**
 * Check if the screen height is greater than the screen width.
 * Check if it is a touch device.
 * If both are true, an info opens.
 */
function checkScreenResolution() {
    let screenHeight = window.screen.availHeight;
    let screenWidth = window.screen.availWidth;
    if (screenHeight > screenWidth && isTouchEnabled()) {
        document.getElementById('portraitWarning').classList.remove('display-none')
    }
}


/**
 * Event listener to detect if the device changes its screen orientation.
 */
portrait.addEventListener("change", function (e) {
    if (e.matches) {
        document.getElementById('portraitWarning').classList.remove('display-none')
    } else {
        document.getElementById('portraitWarning').classList.add('display-none')
    }
})


/**
 * This function checks the aspect ratio in an if statement
 * @returns - The correct CSS class
 */
function checkClassWithAspectRatio() {
    if (checkWindowResolution()) {
        return 'fullscreen-width'
    } else {
        return 'fullscreen-height'
    }
}


/**
 * Adds the class to the required div's to work in landscape mode.
 */
function setFullSize() {
    document.getElementById('mainContent').classList.add(checkClassWithAspectRatio());
    document.getElementById('canvas').classList.add(checkClassWithAspectRatio());
}


/**
 * Removes the class to add the required div's to work in landscape mode.
 */
function setNormalSize() {
    document.getElementById('mainContent').classList.remove(checkClassWithAspectRatio());
    document.getElementById('canvas').classList.remove(checkClassWithAspectRatio());
}


/**
 * If touch is allowed, the mobile control buttons will be activated.
 */
function checkMobileControll() {
    if (isTouchEnabled()) {
        document.getElementById('mobileControl').classList.remove('display-none');
    }
}


/**
 * Checks if this is a touch device.
 * @returns {boolean} - True when the screen is touched, false otherwise.
 */
function isTouchEnabled() {
    return ('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0);
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