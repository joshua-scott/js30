const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.plates');
const items = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e) {
    e.preventDefault();     // don't reload the page on submit
    const text = (this.querySelector('[name=item]')).value;
    const item = {
        text,               // es6 equivalent of 'text: text'
        done: false
    };
    items.push(item);
    populateList(items, itemsList);
    localStorage.setItem('items', JSON.stringify(items));   // localStorage only stores strings
    this.reset();                                           // delete text from input
}

function populateList(plates = [], platesList) {            
    platesList.innerHTML = plates.map((plate, i) => {
        return `
            <li>
                <input type="checkbox" data-index=${i} id="item${i}" ${plate.done ? 'checked' : ''} />
                <label for="item${i}">${plate.text}</label>
            </li>
        `;
    }).join('');
}

function toggleDone(e) {
    if (!e.target.matches('input')) return; // skip this unless it's an input

    const el = e.target;                    // the li that was clicked
    const index = el.dataset.index;         // this is why we have data-index on each li
    items[index].done = !items[index].done;
    localStorage.setItem('items', JSON.stringify(items));
    populateList(items, itemsList);
}

addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleDone);    // using eventDelegation so we only need one eventListener that always works

populateList(items, itemsList);             // load the list on page load (if there is anything in localStorage)