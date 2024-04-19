const BASE_URL = "https://notes-api.dicoding.dev/v2/#/";

class NoteApi {
  static async fetchNotes() {
    try {
      const response = await fetch(BASE_URL + "notes");
      if (!response.ok) {
        throw new Error("Failed to fetch notes");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching notes:", error);
      throw error;
    }
  }

  static async addNote(note) {
    try {
      const response = await fetch(BASE_URL + "notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      });
      if (!response.ok) {
        throw new Error("Failed to add note");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding note:", error);
      throw error;
    }
  }

  static async updateNote(id, updatedNote) {
    try {
      const response = await fetch(BASE_URL + `notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedNote),
      });
      if (!response.ok) {
        throw new Error("Failed to update note");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error updating note:", error);
      throw error;
    }
  }

  static async deleteNote(id) {
    try {
      const response = await fetch(BASE_URL + `notes/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
      throw error;
    }
  }
}

// Contoh penggunaan
(async () => {
  try {
    const notes = await NoteApi.fetchNotes();
    console.log("Fetched notes:", notes);

    const newNote = {
      title: "New Note",
      content: "This is a new note",
    };
    const addedNote = await NoteApi.addNote(newNote);
    console.log("Added note:", addedNote);

    const updatedNote = {
      title: "Updated Note",
      content: "This is an updated note",
    };
    const updatedNoteResponse = await NoteApi.updateNote(
      addedNote.id,
      updatedNote
    );
    console.log("Updated note:", updatedNoteResponse);

    await NoteApi.deleteNote(addedNote.id);
    console.log("Note deleted successfully");
  } catch (error) {
    console.error("Error:", error);
  }
})();
