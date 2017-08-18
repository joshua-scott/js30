const hero = document.querySelector('.hero');
const text = hero.querySelector('h1');
const walk = 115;   // Maximum shadow stretch distance

function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero;      // ES6 destructuring syntax!
    let { offsetX: x, offsetY: y } = e;

    /* 'this' will *always* be 'hero' (the thing we added an event listener to).
        But, 'e.target' will be whatever actually triggered this function (potentially the h1).
        So, we add the extra pixels required to give an accurate pixel count for mouse location... */
    if (this !== e.target) {
        x += e.target.offsetLeft;
        y += e.target.offsetTop;
    }

    /* At the *most*, how many pixels should the shadow stretch?
       The max will be half of 'walk' in either direction (e.g. -50 to +50px). */
    const xWalk = Math.round((x / width * walk) - (walk / 2));
    const yWalk = Math.round((y / height * walk) - (walk / 2));

    const xWalkOuter = xWalk * 1.5;
    const yWalkOuter = yWalk * 1.5;

    text.style.textShadow = `
        ${xWalk}px ${yWalk}px 0 rgba(255,0,0,0.7),
        ${-xWalk}px ${yWalk}px 0 rgba(0,255,0,0.7),
        ${xWalk}px ${-yWalk}px 0 rgba(0,0,255,0.7),
        ${-xWalk}px ${-yWalk}px 0 rgba(255,255,255,0.7),

        ${xWalkOuter}px ${yWalkOuter}px 0 rgba(255,255,255,0.7),
        ${-xWalkOuter}px ${yWalkOuter}px 0 rgba(255,0,255,0.7),
        ${xWalkOuter}px ${-yWalkOuter}px 0 rgba(0,255,255,0.7),
        ${-xWalkOuter}px ${-yWalkOuter}px 0 rgba(255,255,0,0.7)`;

}

hero.addEventListener('mousemove', shadow);
