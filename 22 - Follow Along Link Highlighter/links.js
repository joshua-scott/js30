const triggers = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

function highlightLink() {
    // Get the height/width/left/top of the link that is being hovered
    const linkCoords = this.getBoundingClientRect();

    // Note adjustments for scrollX and scrollY
    const coords = {
        width: linkCoords.width,
        height: linkCoords.height,
        left: linkCoords.left + window.scrollX,
        top: linkCoords.top + window.scrollY
    }
    
    // Apply the styles to highlight
    highlight.style.width = `${coords.width}px`;
    highlight.style.height = `${coords.height}px`;
    highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}

triggers.forEach(a => a.addEventListener('mouseenter', highlightLink));
