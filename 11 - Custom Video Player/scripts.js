const video = document.querySelector('video');
const progressBar = document.querySelector('.progress__filled');

const controls = {
    play:    document.querySelector('.toggle'),
    volume:  document.getElementsByName('volume')[0],
    speed:   document.getElementsByName('playbackRate')[0],
    back:    document.querySelectorAll('[data-skip]')[0],
    forward: document.querySelectorAll('[data-skip]')[1]
};

/* Play button */
controls.play.addEventListener('click', togglePlay);

function togglePlay() {
    if (video.paused) {
        video.play();
        controls.play.textContent = '❙❙';
    } else {
        video.pause();
        controls.play.textContent = '►';
    }
}

/* Skip buttons */
controls.forward.addEventListener('click', skipVideo);
controls.back.addEventListener('click', skipVideo);

function skipVideo() {
    video.currentTime += Number(this.dataset.skip);
}

/* Progress bar */
setInterval(updateProgressBar, 1000);

function updateProgressBar() {
    progressBar.style.flexBasis = `${video.currentTime / video.duration * 100}%`;
}
