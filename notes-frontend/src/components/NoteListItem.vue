<script setup>
import Note from '@/models/Note.js'
import { useEditorStore } from "@/stores/editor.js";

const editorStore = useEditorStore();

const { note } = defineProps({
  note: {
    type: Note,
    default: null
  } });

// console.log("openNote conditions", editorStore.openNote != null, note.id === editorStore.openNote.id)

</script>

<template>
  <v-list-item
    :key="note.id"
    :value="note"
    :title="note.title"
    :subtitle="note.body"
    :active="editorStore.openNote && editorStore.openNote.id === note.id"
    @click="editorStore.openNote = note"
  >
    <template #append>
      <v-btn icon="mdi-dots-vertical" />
    </template>
  </v-list-item>
</template>

<style scoped lang="sass">

</style>
