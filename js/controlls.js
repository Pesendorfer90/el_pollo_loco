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