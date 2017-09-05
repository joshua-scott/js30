const slider = document.querySelector('.items');
let isDown = false; // Is the mouse btn being held down?
let startX; // Cursor position at initial mousedown
let scrollLeft; // Slider scroll position at initial mousedown

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
  slider.classList.remove('active');
  isDown = false;
});

slider.addEventListener('mouseup', () => {
  slider.classList.remove('active');
  isDown = false;
});


slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault(); // Avoid doing anything we don't want (e.g. selecting text)

  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});