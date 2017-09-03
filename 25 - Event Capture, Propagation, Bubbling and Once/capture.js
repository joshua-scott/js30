const divs = document.querySelectorAll('div');

function logThis(e) {
  console.log(this);

  /*  This line stops the event from propagating further than whatever it first activated.
      Usually, this means it fires only on what was actually clicked (or whatever the eventListener is).
      *However*, if capture = true in the eventListener, it'll only fire on the outermost parent that has the relevant eventListener - 
        since that's the first thing that will fire. */
  // e.stopPropagation();
}

/* 
The first eventListener will run the function on the *bubble*. This means the innermost div will run first, then its parent, then its parent, etc.

The second eventListener will run the function on the *capture*.
This is the 'ripple down' from the root element to the specific div that was clicked. 
In the browser, this actually occurs *before* bubbling, though of course by default, capture is set to false (so eventListeners fire on the bubble).
*/
// divs.forEach(div => div.addEventListener('click', logThis));
// divs.forEach(div => div.addEventListener('click', logThis, { capture: true }));

/* 
In the 'options' object on eventListeners, if 'once = true', the eventListener will unbind itself after being called once.
This is a fairly new feature, and is equivalent to calling 'removeEventListener'.
Note that due to bubbling, if the eventListener below is activated AND you use e.stopPropagation(), 
  and you click on the 'third' div three times, logThis() will show:
'Third, Second, First'.
That's because the 'once' only applies to what actually fired the callback function. If it's something that's nested, 
  it will just bubble to the next thing once it's been unbinded. 
(Of course, in this case, the order would be reversed if capture:true was set in the options object when the eventListener was set.)

'Once' is especially useful for buttons - e.g. a store checkout feature, where you only want the user to click the button once.
*/
divs.forEach(div => div.addEventListener('click', logThis, { once: true }));
