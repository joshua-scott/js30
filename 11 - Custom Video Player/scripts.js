const player = document.querySelector('.player');
const video = player.querySelector('video');
const progress = player.querySelector('.progress')
const progressFilled = player.querySelector('.progress__filled');

const controls = {
    toggle:    player.querySelector('.toggle'),
    range:  player.querySelectorAll('input[type=range]'),
    skip:    player.querySelectorAll('[data-skip]'),
    scrubber: player.querySelector('.progress')
};

/* Play button */
controls.toggle.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);

function togglePlay() {
    video.paused ? video.play() : video.pause();
}

/* Change play button icon */
video.addEventListener('play', toggleButton);
video.addEventListener('pause', toggleButton);

function toggleButton() {
    const icon = this.paused ? '►' : '❙❙';
    controls.toggle.textContent = icon;
}

/* Skip buttons */
controls.skip.forEach(btn => btn.addEventListener('click', skipVideo));

function skipVideo() {
    video.currentTime += Number(this.dataset.skip);
}

/* Progress bar */
video.addEventListener('timeupdate', updateprogressFilled);

function updateprogressFilled() {
    progressFilled.style.flexBasis = `${video.currentTime / video.duration * 100}%`;
}

/* Volume and speed sliders */
controls.range.forEach(slider => slider.addEventListener('input', handleRangeUpdate));

function handleRangeUpdate() {
    video[this.name] = this.value;
}

/* Progress slider */
controls.scrubber.addEventListener('click', scrub); // Handles simple clicks

controls.scrubber.addEventListener('mousemove', e => { mousedown && scrub(e) }); // Handles dragging
let mousedown = false; 
player.addEventListener('mousedown', () => mousedown = true);
player.addEventListener('mouseup', () => mousedown = false);

function scrub(e) {
    const scrubTime = e.offsetX / progress.offsetWidth;
    video.currentTime = video.duration * scrubTime;
}
