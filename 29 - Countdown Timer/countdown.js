const timerDisplay = document.querySelector('.display__time-left');
const endDisplay = document.querySelector('.display__end-time');
const timerButtons = document.querySelectorAll('[data-time]');
let countdown;

function timer(seconds) {
  clearInterval(countdown); // Clear any existing timers
  const startTime = Date.now();
  const endTime = startTime + seconds * 1000;
  displayEndTime(endTime);
  displayTimeLeft(seconds); // We call this now to avoid having to wait a second for setInterval

  // Every second, either end the timer or show the time left
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
  endDisplay.textContent = `Be back at ${end.getHours()}:${toTwoDigits(end.getMinutes())}`;
}

function displayTimeLeft(secs) {
  // convert secs into hours/mins/secs
  const hours = Math.floor(secs / 3600);
  secs = secs % 3600;
  const mins = Math.floor(secs / 60);
  secs = secs % 60;

  let display = '';
  if (hours > 0) {
    display = `${hours}:${toTwoDigits(mins)}:${toTwoDigits(secs)}`;
  } else {
    display = `${mins}:${toTwoDigits(secs)}`;
  }

  timerDisplay.textContent = display;
  document.title = display;
}

function endTimer() {
  clearInterval(countdown);
  timerDisplay.textContent = '';
  endDisplay.textContent = 'It\'s time!';
}

function toTwoDigits(num) {
  return `${num < 10 ? '0' : ''}${num}`;
}

/* We can't use arrow functions for the eventListeners below because we need to use 'this' */
timerButtons.forEach(btn => btn.addEventListener('click', function () {
  timer(parseInt(this.dataset.time));
}));

document.customForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Don't try to submit the form anywhere
  const secs = this.minutes.value * 60;
  this.reset();

  if (secs > 0) {
    timer(secs);
  }
});