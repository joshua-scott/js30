const timerButtons = Array.from(document.querySelectorAll('.timer__button'));
let countdown;

function timer(seconds) {
  const startTime = Date.now();
  const endTime = startTime + seconds * 1000;
  displayTimeLeft(seconds);

  countdown = setInterval(() => {
    const secondsLeft = Math.round((endTime - Date.now()) / 1000);
    if (secondsLeft <= 0) {
      console.log('DING DING DING');
      clearInterval(countdown);
    } else {
      displayTimeLeft(secondsLeft);
    }
  }, 1000);
}

function displayTimeLeft(seconds) {
  // convert seconds into hours/mins/secs
  const hours = Math.floor(seconds / 3600);
  seconds = seconds % 3600;

  const mins = Math.floor(seconds / 60);
  seconds = seconds % 60;

  console.log(hours, mins, seconds);
}

timerButtons.forEach(btn => btn.addEventListener('click', function () {
  clearInterval(countdown);
  timer(this.dataset.time);
}));