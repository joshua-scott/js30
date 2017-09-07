const timerDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');
const timerButtons = Array.from(document.querySelectorAll('.timer__button'));
let countdown;

function timer(seconds) {
  const startTime = Date.now();
  const endTime = startTime + seconds * 1000;
  displayEndTime(endTime);
  displayTimeLeft(seconds); // We call this now to avoid having to wait a second for setInterval

  countdown = setInterval(() => {
    const secondsLeft = Math.round((endTime - Date.now()) / 1000);
    if (secondsLeft < 0) {
      endTimer();
    } else {
      displayTimeLeft(secondsLeft);
    }
  }, 1000);
}

function displayEndTime(timestamp) {
  const end = new Date(timestamp);
  const hour = end.getHours();
  const mins = end.getMinutes();
  endDisplay.textContent = `Be back at ${hour}:${mins < 10 ? '0' : ''}${mins}`;
}

function displayTimeLeft(secs) {
  // convert secs into hours/mins/secs (don't need hours but left for later use)
  const hours = Math.floor(secs / 3600);
  secs = secs % 3600;
  const mins = Math.floor(secs / 60);
  secs = secs % 60;

  const display = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  timerDisplay.textContent = display;
  document.title = display;
}

function endTimer() {
  alert('Time is up!');
  clearInterval(countdown);
  timerDisplay.textContent = '';
  endDisplay.textContent = '';
}

timerButtons.forEach(btn => btn.addEventListener('click', function () {
  clearInterval(countdown);
  timer(this.dataset.time);
}));