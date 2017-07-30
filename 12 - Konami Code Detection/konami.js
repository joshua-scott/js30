const konami = "ArrowUp,ArrowDown,ArrowUp,ArrowDown,ArrowRight,ArrowLeft,ArrowRight,ArrowLeft,KeyB,KeyA,Enter";
let pressed = [];

window.addEventListener('keyup', checkForCode);

function checkForCode(e) {
    pressed.push(e.code);

    /* .shift() would also work here. But in case user messes with
       the array in devtools, this will fix it on the next keypress */
    if (pressed.length > 11) {
        pressed.splice(0, pressed.length - 11);
    }

    if (pressed.join().includes(konami)) {
        if (typeof cornify_add === 'function') {
            cornify_add();  // Adds unicorns and rainbows to the screen!
        } else {
            alert("Secret code detected!");
        }
    }
}
