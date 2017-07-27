// Add all the checkboxes to an array
const checkboxes = document.querySelectorAll(".inbox input[type=checkbox]");
let indexLastClicked;

// Add click event listeners to all checkboxes
// Add a new property, checkboIndex, that matches its index
for (let i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checkboxIndex = i;
    checkboxes[i].addEventListener("click", processClick);
}

/*  If shift was held and it's not the first click, (un)check boxes inbetween.
    Regardless, update last clicked checkbox */
function processClick(e) {
    if (e.shiftKey && indexLastClicked !== undefined) {
        invertCheckboxes(e);
    }

    indexLastClicked = e.target.checkboxIndex;
}

function invertCheckboxes(e) {
    // (un)check boxes above the clicked one
    if (indexLastClicked < e.target.checkboxIndex) {
        for (let i = Number(e.target.checkboxIndex) - 1; i > indexLastClicked; i--) {
            checkboxes[i].checked = !checkboxes[i].checked;
        }
    } else {
        // (un)check boxes below the clicked one
        for (let i = Number(e.target.checkboxIndex) + 1; i < indexLastClicked; i++) {
            checkboxes[i].checked = !checkboxes[i].checked;
        }
    }
}

