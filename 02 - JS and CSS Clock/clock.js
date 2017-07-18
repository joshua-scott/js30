const secondHand = document.querySelector(".second-hand");
const minuteHand = document.querySelector(".minute-hand");
const hourHand = document.querySelector(".hour-hand");

function setDate() {
    const now       = new Date();
    const seconds   = now.getSeconds();
    const minutes   = now.getMinutes();    
    const hours     = now.getHours();
    
    /* Second hand */
    const secondsDegrees = (seconds / 60 * 360);
    // Prevent weird clipping effect on change from 59 to 0
    if (secondsDegrees == 0) {
        secondHand.style.transition = "";
    } 
    if (secondsDegrees == 6) {
        secondHand.style.transition = "all 0.05s";
    } 
    // We have to add 90deg to all hands, since the divs are horizontal by default
    secondHand.style.transform = `rotate(${secondsDegrees + 90}deg)`;


    /* Minute hand */
    // Minute hand position to nearest hour
    let minutesDegrees = (minutes / 60 * 360);
    // Specific minute position is up to (360/60) degrees more
    const secondsAsFraction = (seconds / 60); 
    minutesDegrees += (360 / 60) * secondsAsFraction;
    minuteHand.style.transform = `rotate(${minutesDegrees + 90}deg)`;    

    /* Hour hand */
    // Hour hand position to nearest hour
    let hoursDegrees = (hours / 60 * 360); 
    // Specific hour position is up to (360/12) degrees more
    const minutesAsFraction = (minutes / 60); 
    hoursDegrees += (360 / 12) * minutesAsFraction;
    hourHand.style.transform = `rotate(${hoursDegrees + 90}deg)`;
}

setInterval(setDate, 1000); 
