import { defineStore } from 'pinia';
import { useStorage } from "@vueuse/core";
import { useNotesApi } from "@/composables/notesApi.js";
import Note from "@/models/Note.js";

const notesApi = useNotesApi();

export const useEditorStore = defineStore('editor', () => {
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
        return v ? JSON.stringify(v) : []
      }
    }
  });
  // const notes = useStorage('notes', []);
  const openNote = useStorage('openNote', null, undefined, {
    serializer: {
      read: (v) => {
        console.log("v value", v)
        const j = JSON.parse(v);
        if (j.length === 0) return null;
        return new Note(j);
      },
      write: (v) => {
        return v ? JSON.stringify(v) : []
      }
    }
  });

  // const openNote = useStorage('openNote', null);

  async function getNotes() {
    notes.value = await notesApi.getNotesForLoggedInUser();
  }

  function $reset() {
    notes.value = [];
    openNote.value = null;
  }

  return { notes, openNote, getNotes, $reset };
})
