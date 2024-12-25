<script setup>
import NotesList from "@/components/NotesList.vue";
import NoteEditor from "@/components/NoteEditor.vue";

</script>

<template>
  <v-sheet class="d-flex h-100">
    <v-sheet
      class="d-flex"
      max-width="300"
      min-width="300"
      width="300"
    >
      <NotesList />
    </v-sheet>
    <v-sheet
      class="d-flex flex-fill"
    >
      <NoteEditor />
    </v-sheet>
  </v-sheet>
</template>

<style scoped lang="sass">

</style>
