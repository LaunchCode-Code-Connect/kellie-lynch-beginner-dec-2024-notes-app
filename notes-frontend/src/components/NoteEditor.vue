<script setup>
import Note from "@/models/Note.js";
import { storeToRefs} from "pinia";
import { useEditorStore } from "@/stores/editor.js";

const editorStore = useEditorStore();
const { openNote } = storeToRefs(editorStore);

</script>

<template>
  <v-card
    v-if="openNote"
    class="fill-height flex-fill"
  >
    <v-card-title>
      <v-text-field
        v-model="openNote.title"
        variant="solo-filled"
      />
    </v-card-title>
    <v-card-text>
      <v-textarea
        v-model="openNote.body"
        variant="solo-filled"
      />
    </v-card-text>
    <v-card-actions class="d-flex justify-end">
      <v-btn
        color="primary"
        variant="tonal"
        text="Cancel"
      />
      <v-btn
        color="primary"
        variant="elevated"
        text="Save"
        @click="editorStore.saveNote(openNote)"
      />
    </v-card-actions>
  </v-card>
</template>

<style scoped lang="sass">

</style>
