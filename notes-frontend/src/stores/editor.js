import { defineStore } from 'pinia';
import { useStorage } from "@vueuse/core";
import { useNotesApi } from "@/composables/notesApi.js";
import Note from "@/models/Note.js";

const notesApi = useNotesApi();

export const useEditorStore = defineStore('editor', () => {
  // const private = usePrivateEditorStore()

  const notes = useStorage('notes', [], undefined, {
    serializer: {
      read: (v) => {
        const j = JSON.parse(v);
        if (j.length === 0) return j;
        const converted = [];
        for (const data of j){
          converted.push(new Note(data));
        }
        return converted;
      },
      write: (v) => {
        console.log("notes storage object is being updated", v)
        return v ? JSON.stringify(v) : []
      }
    }
  });

  const openNote = useStorage('openNote', null, undefined, {
    serializer: {
      read: (v) => {
        console.log("v value", v)
        const j = JSON.parse(v);
        if (j.length === 0) return null;
        return new Note(j);
      },
      write: (v) => {
        console.log("openNote storage object is being updated", v)
        return v ? JSON.stringify(v) : null
      }
    }
  });

  const noteHasChanged = (note) => {
    console.log("in noteHasChanged, note is", note, "notes are", notes)

    for (const n of notes.value) {
      if (n.id === note.id){
        console.log("are they the same object", n === note);
        return note.title !== n.title || note.body !== n.body;
      }
    }
    return true;
  }

  async function saveNote(note) {
    console.log("noteHasChanged returns", noteHasChanged(note))
    if(noteHasChanged(note)){
      await notesApi.updateNote(note)
    }
    // TODO: ASAP, FIGURE OUT HOW TO UPDATE notes AFTER API CALL
  }

  async function getNotes() {
    notes.value = await notesApi.getNotesForLoggedInUser();
  }

  function $reset() {
    notes.value = [];
    openNote.value = null;
  }

  return { notes, openNote, noteHasChanged, saveNote, getNotes, $reset };
})

// const usePrivateEditorStore = defineStore('editorPrivate', () => {
//   const openNoteId = useStorage('openNoteId', null)
// })
