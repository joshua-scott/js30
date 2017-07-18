function playSound(e) {
    // Use the keycode to get the matching audio tag and div
    // Uses ES6 syntax embedded in the string
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);

    // If key doesn't have a matching sound, return
    if (!audio) return;

    // Enable sounds to play before the current sound finishes
    audio.currentTime = 0;
    audio.play();

    key.classList.add("playing");
}

function removeTransition(e) {
    // Prevent function continuing for *all* transitions (i.e. border-top-color etc)
    if (e.propertyName !== "transform") return;

    this.classList.remove("playing");
}


// Create Node List of all elements with class 'key'
const keys = document.querySelectorAll(".key");
// Call the removeTransition() function after the transition has completed
keys.forEach(key => key.addEventListener("transitionend", removeTransition));
// When someone presses the key, play the sound
window.addEventListener("keydown", playSound);