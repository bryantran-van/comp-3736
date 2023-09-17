// JavaScript code for reader.html
const notesContainer = document.getElementById('notes-container');
const lastRetrievedTime = document.getElementById('last-retrieved-time');


function Note() {
    this.text = '';
  
    this.setText = function (text) {
      this.text = text;
    };
  
    this.getText = function () {
      return this.text;
    };
  }
// Function to retrieve and display notes from local storage
function retrieveAndDisplayNotes() {
  const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];

  notesContainer.innerHTML = ''; // Clear the container

  storedNotes.forEach(noteData => {
    const note = new Note(); // Create a new Note instance
    note.setText(noteData.text); // Set the text from stored data

    const noteText = note.getText();
    const noteElement = document.createElement('div');
    noteElement.textContent = noteText;
    notesContainer.appendChild(noteElement);
  });

  const retrievalTime = new Date().toLocaleTimeString();
  lastRetrievedTime.textContent = `Last retrieved: ${retrievalTime}`;
}

// Initial retrieval and display of notes
window.addEventListener('load', retrieveAndDisplayNotes);

// Periodically retrieve and display notes
setInterval(retrieveAndDisplayNotes, 2000);