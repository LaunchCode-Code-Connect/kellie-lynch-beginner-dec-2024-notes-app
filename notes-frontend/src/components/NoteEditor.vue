<script setup>
import Note from "@/models/Note.js";
import { useEditorStore } from "@/stores/editor.js";

const editorStore = useEditorStore();
console.log("openNote value", editorStore.openNote);

</script>

<template>
  <v-card
    v-if="editorStore.openNote"
    class="fill-height flex-fill"
  >
    <v-card-title>{{ editorStore.openNote.title }}</v-card-title>
    <v-card-text>{{ editorStore.openNote.body }}</v-card-text>
  </v-card>
</template>

<style scoped lang="sass">

</style>
