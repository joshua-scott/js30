const video = document.querySelector('video');
const speed = document.querySelector('.speed');
const bar = speed.querySelector('.speed-bar');

const min = 0.5;
const max = 4;
let isDown;

function setSpeed(e) {
  if (!isDown && e.type === 'mousemove') return;
  e.preventDefault();

  // Distance in pixels from the top of the scrubber
  const yPos = e.pageY - this.offsetTop;
  const yPercent = yPos / this.offsetHeight;
  const rate = ((yPercent * (max - min)) + min).toFixed(1);

  bar.style.height = `${yPercent * 100}%`;
  bar.textContent = `${rate}×`;
  video.playbackRate = rate;
}

speed.addEventListener('mousemove', setSpeed);
speed.addEventListener('click', setSpeed);
document.addEventListener('mousedown', () => isDown = true);
document.addEventListener('mouseup', () => isDown = false);