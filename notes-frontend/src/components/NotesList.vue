<script setup>
import { defineEmits, computed } from "vue";
import NoteListItem from "@/components/NoteListItem.vue";
import { useUserStore } from "@/stores/user.js";
import { useEditorStore } from "@/stores/editor.js";
import Note from "@/models/Note.js";
import { storeToRefs } from "pinia";

const editor = useEditorStore();
// defineEmits(['selectNote'])
// console.log("open note", editor.openNote)


</script>

<template>
  <v-list
    lines="two"
  >
    <NoteListItem
      v-for="note in editor.notes"
      :key="note.id"
      :note="note"
    />
  </v-list>
</template>

<style scoped lang="sass">

</style>
