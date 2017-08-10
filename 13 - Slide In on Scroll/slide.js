function debounce(func, wait = 20, immediate = true) {
    var timeout;
    return function () {
        var context = this,
            args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

const slideImages = document.querySelectorAll('.slide-in');

function checkSlide(e) {
    slideImages.forEach(slideImage => {
        const bottomPixels = window.scrollY + window.innerHeight;       // Pixel count at the very bottom of screen
        const slideInAt = bottomPixels - (slideImage.height / 2);       // When exactly half of the image is peeking from the bottom of screen
        const imageBottom = slideImage.offsetTop + slideImage.height;   // Pixel count of the bottom of the image (offsetTop = pixels from top of screen to top of image)

        const isHalfShown = slideInAt > slideImage.offsetTop;
        const isNotScrolledPast = window.scrollY < imageBottom;         // Slide image back out when it's offscreen

        // If true, the image must be in the 'sweet spot' where it's at least half-visible from the bottom, and not somewhere above the screen
        if (isHalfShown && isNotScrolledPast) {
            slideImage.classList.add('active');
        } else {
            slideImage.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', debounce(checkSlide));