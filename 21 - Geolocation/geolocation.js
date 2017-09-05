const arrow = document.querySelector('.arrow');
const speed = document.querySelector('.speed-value');

// We use watchPosition instead of getPosition so it continually updates
navigator.geolocation.watchPosition(data => {
  console.dir(data);
  speed.textContent = data.coords.speed;
  arrow.style.transform = `rotate(${data.coords.heading}deg)`;
}, err => {
  console.err(err);
  alert('Please refresh and allow location access.');
});