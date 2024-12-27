import { useFetchFromApi } from "@/composables/fetchFromApi.js";
import {watch} from "vue";
import Note from "@/models/Note.js";

export function useNotesApi(){
  async function getNotesForLoggedInUser() {
    const {data, loading, fetchData } = useFetchFromApi()
    const notes = [];
    watch(loading, (newVal) => {
      if( newVal === false ) {
        const v = data.value;
        for (const note of v) {
          const n = new Note(note);
          notes.push(n);
        }
      }
    });
    await fetchData("/note/notes", "GET");
    return notes;
  }

  async function addNote(newNote) {}

  async function updateNote(note) {
    const {data, loading, fetchData } = useFetchFromApi();
    const parsed = JSON.parse(JSON.stringify(note));
    parsed.user_id = parsed.author;
    delete parsed.author;

    await fetchData(`/note/${note.id}`, "PUT", undefined, undefined, JSON.stringify(parsed))
  }

  return { getNotesForLoggedInUser, updateNote };
}
