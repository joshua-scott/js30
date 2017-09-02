const nav = document.querySelector('#main');
const navOffsetTop = nav.offsetTop;

function fixNav() {
  if (scrollY >= navOffsetTop) {
    document.body.style.paddingTop = nav.offsetHeight + 'px'; 
    document.body.classList.add('fixed-nav');
  } else {
    document.body.style.paddingTop = '';     
    document.body.classList.remove('fixed-nav');
  }
}

document.addEventListener('scroll', fixNav);