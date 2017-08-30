const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');
const rgbInputs = document.querySelectorAll('.rgb input');

function getVideo() {
  navigator.mediaDevices.getUserMedia({ video: true, audio: false })
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.src = window.URL.createObjectURL(localMediaStream);
      video.play();
    })
    .catch(err => {
      alert('No webcam found. Connect it and refresh.');
      console.error('No webcam found:', err);
    });
}

function paintToCanvas() {
  const width = video.videoWidth;
  const height = video.videoHeight;
  canvas.width = width;
  canvas.height = height;

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);

    // take the pixels out
    let pixels = ctx.getImageData(0, 0, width, height);

    // adjust the pixels
    // pixels = redEffect(pixels);
    // pixels = rgbSplit(pixels);
    // pixels = greenScreen(pixels);
    pixels = greenScreen(pixels);

    // put pixels back
    ctx.putImageData(pixels, 0, 0);
  }, 16);
}

function takePhoto() {
  // play sound
  snap.currentTime = 0;
  snap.play();

  // take the data out of the canvas
  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', 'handsome');
  link.innerHTML = `<img src="${data}" alt="Handsome Man" />`;
  strip.insertBefore(link, strip.firstChild);
}

function redEffect(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i + 0] += 100;  // red
    pixels.data[i + 1] -= 50;   // green
    pixels.data[i + 2] *= 0.5;  // blue
  }
  return pixels;
}

function rgbSplit(pixels) {
  for(let i = 0; i < pixels.data.length; i += 4) {
    pixels.data[i - 150] = pixels.data[i + 0];  // red
    pixels.data[i + 100] = pixels.data[i + 1];   // green
    pixels.data[i - 200] = pixels.data[i + 2];  // blue
  }
  return pixels;
}

function greenScreen(pixels) {
  const levels = {};

  // get the current value of each slider
  rgbInputs.forEach(input => {
    levels[input.name] = input.value;
  });

  /* go through each pixel, and if it's between the chosen levels, set its alpha to 0 */
  for(let i = 0; i < pixels.data.length; i += 4) {
    const red = pixels.data[i + 0];
    const green = pixels.data[i + 1];
    const blue = pixels.data[i + 2];

    if (red   >= levels.rmin &&  red   <= levels.rmax &&
        green  >= levels.gmin &&  green  <= levels.gmax &&
        blue >= levels.bmin &&  blue <= levels.bmax) {
          pixels.data[i + 3] = 0;
    }
  }
  return pixels;
}

getVideo();

video.addEventListener('canplay', paintToCanvas);
document.querySelector('button').addEventListener('click', takePhoto);