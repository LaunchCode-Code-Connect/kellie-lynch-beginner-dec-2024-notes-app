<script setup>
import { ref } from "vue";
import NotesList from "@/components/NotesList.vue";
import NoteEditor from "@/components/NoteEditor.vue";
import Note from "@/models/Note.js";

const currentNote = ref(null);

</script>

<template>
  <v-card
    max-width="300"
    min-width="300"
    width="300"
    location="left"
  >
    <NotesList
      @select-note="(n) => currentNote = n"
    />
  </v-card>
  <v-card
    class="w-100 h-100"
  >
    <NoteEditor
      :note="currentNote"
    />
  </v-card>
</template>

<style scoped lang="sass">

</style>
