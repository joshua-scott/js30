const words = document.querySelector('.words');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

// continuously update what you say as you speak
recognition.interimResults = true;

// Create a new paragraph and append it to the end
let p = document.createElement('p');
words.appendChild(p);

recognition.addEventListener('result', e => {
  // Convert the speech to a string
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    // Display what was said
    p.textContent = transcript;
    console.log(transcript);

    // If we've reached the end of a statement, start a new paragraph
    if (e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
    }
});

// Begin speech recognition on page load
recognition.start();
// Listen for another speech event after I've already finished
recognition.addEventListener('end', recognition.start);
