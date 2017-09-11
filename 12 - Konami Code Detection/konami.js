const konami = "ArrowUp,ArrowUp,ArrowDown,ArrowDown,ArrowLeft,ArrowRight,ArrowLeft,ArrowRight,KeyB,KeyA";
let pressed = [];

window.addEventListener('keyup', checkForCode);

function checkForCode(e) {
    pressed.push(e.code);
    
    /* .shift() would also work here. But in case user messes with
    the array in devtools, this will fix it on the next keypress */
    if (pressed.length > 10) {
        pressed.splice(0, pressed.length - 10);
    }
    
    if (pressed.join().includes(konami)) {
        cornify_add();
    }
}
