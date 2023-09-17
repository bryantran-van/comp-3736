// JavaScript code for writer.html
const notesContainer = document.getElementById('notes-container');
const addNoteButton = document.getElementById('add-note-btn');
const lastSaveTime = document.getElementById('last-save-time'); // Reference to display last save time

function Note() {
  this.text = '';

  this.setText = function (text) {
    this.text = text;
  };

  this.getText = function () {
    return this.text;
  };
}

let saveTime = new Date().toLocaleTimeString(); // Initialize saveTime

// Function to add a new note
function addNote() {
  const note = new Note();
  const textarea = document.createElement('textarea');
  textarea.placeholder = 'Enter your note here';
  textarea.addEventListener('input', () => {
    note.setText(textarea.value);
    updateLocalStorage();
  });

  const removeButton = document.createElement('button');
  removeButton.textContent = 'Remove';
  removeButton.addEventListener('click', () => {
    notesContainer.removeChild(textarea);
    notesContainer.removeChild(removeButton);
    updateLocalStorage();
  });

  notesContainer.appendChild(textarea);
  notesContainer.appendChild(removeButton);

  updateLocalStorage();
}

// Function to update local storage with notes
function updateLocalStorage() {
  const notes = [];
  const textareas = notesContainer.querySelectorAll('textarea');

  textareas.forEach(textarea => {
    const note = new Note();
    note.setText(textarea.value);
    notes.push(note);
  });

  localStorage.setItem('notes', JSON.stringify(notes));
  saveTime = new Date().toLocaleTimeString(); // Update saveTime
  displayLastSavedTime();
}

// Function to display the last saved time
function displayLastSavedTime() {
  lastSaveTime.textContent = `Last Save Time: ${saveTime}`; // Display last saved time
}

// Retrieve existing notes from local storage on page load
window.addEventListener('load', () => {
  const storedNotes = JSON.parse(localStorage.getItem('notes')) || [];

  storedNotes.forEach(noteData => {
    const note = new Note();
    note.setText(noteData.text);
    addNote();
    const textareas = notesContainer.querySelectorAll('textarea');
    textareas[textareas.length - 1].value = note.getText();
  });

  displayLastSavedTime();
});

// Add event listener for the "Add Note" button
addNoteButton.addEventListener('click', addNote);

// Periodically update local storage and display last saved time
setInterval(updateLocalStorage, 2000);