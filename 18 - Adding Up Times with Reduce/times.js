// We must convert the nodeList into an array.
const timeNodes = Array.from(document.querySelectorAll('[data-time]'));


let seconds = timeNodes
    // time as string
    .map(node => node.dataset.time)
    // es6 destructuring syntax to get mins and secs, then convert to secs only
    .map(timeCode => {
        const [mins, secs] = timeCode.split(':').map(parseFloat);
        return (mins * 60) + secs;
    })
    // reduce to one total number of seconds
    .reduce((a, b) => a + b);

// convert seconds into hours/mins/secs
const hours = Math.floor(seconds / 3600);
seconds = seconds % 3600;

const mins = Math.floor(seconds / 60);
seconds = seconds % 60;

// log the result
console.log(hours, mins, seconds);