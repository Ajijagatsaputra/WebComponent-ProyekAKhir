import '../data/API/note-api.js';
import { fetchNotes as fetchNotesFromAPI, addNote, deleteNote } from '../data/API/note-api.js'; // Menggunakan alias fetchNotesFromAPI untuk menghindari konflik

function displayNotes() {
    const noteList = document.getElementById("noteList");
    noteList.innerHTML = "";
    
    const notes = fetchNotesFromAPI(); // Menggunakan fetchNotes dari impor
    notes.forEach((note) => {
        const noteElement = document.createElement("div");
        noteElement.classList.add("note-item");
        noteElement.setAttribute("data-note-id", note.id);
        
        const body = note.body ? note.body : '';
        const description = note.description ? note.description : '';
        
        noteElement.innerHTML = `
            <h3>${note.title}</h3>
            <p>${body ? body + ' ' : ''}${description}</p>
            <button class="delete-button">Delete</button>
        `;
        noteList.appendChild(noteElement);
    });
}

document.getElementById("formNote").addEventListener("submit",async function(event) {
    event.preventDefault();
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    
    if (title && description) {
        const newNote = {
            id: `note-${Math.random().toString(36).substr(2, 9)}`,
            title: title,
            description: description
        };
        await addNote(newNote);
        displayNotes();
        document.getElementById("formNote").reset();
    } else {
        alert("Judul dan catatan tidak boleh kosong!");
    }
});

document.getElementById("noteList").addEventListener("click",async (event) => {
    if (event.target.classList.contains("delete-button")) {
        const noteId = event.target.parentElement.getAttribute("data-note-id");
        await deleteNote(noteId);
        displayNotes();
    }
});

displayNotes();
