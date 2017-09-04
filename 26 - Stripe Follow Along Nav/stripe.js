const triggers = document.querySelectorAll('.cool > li');
const background = document.querySelector('.dropdownBackground');
const nav = document.querySelector('.top');

function handleEnter() {
  this.classList.add('trigger-enter');
  setTimeout(() => {
    // The if-statement prevents problems if you mouseleave before 150ms
    if (this.classList.contains('trigger-enter')) {
      this.classList.add('trigger-enter-active');
    }
  }, 150);
  // ^ Arrow functions inherit 'this' from the parent (makes more sense than pre-ES6)

  background.classList.add('open');

  // Get the specific dropdown for this li
  const dropdown = this.querySelector('.dropdown');
  // How big should the dropdown box be?
  const dropdownCoords = dropdown.getBoundingClientRect();
  // Where should it be? We can't assume the nav will always be the first thing on the page
  const navCoords = nav.getBoundingClientRect();

  const coords = {
    height: dropdownCoords.height,
    width: dropdownCoords.width,
    top: dropdownCoords.top - navCoords.top,
    left: dropdownCoords.left - navCoords.left
  };

  background.style.setProperty('width', `${coords.width}px`);
  background.style.setProperty('height', `${coords.height}px`);
  background.style.setProperty('transform', `translate(${coords.left}px, ${coords.top}px)`);
}

function handleLeave() {
  this.classList.remove('trigger-enter', 'trigger-enter-active');
  background.classList.remove('open');
}

triggers.forEach(li => li.addEventListener('mouseenter', handleEnter));
triggers.forEach(li => li.addEventListener('mouseleave', handleLeave));