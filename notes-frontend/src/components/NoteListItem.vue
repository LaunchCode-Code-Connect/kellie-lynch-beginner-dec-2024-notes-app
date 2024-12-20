<script setup>
import Note from '@/models/Note.js'
const { note } = defineProps({note: Note});

</script>

<template>
  <v-list-item>
    {{ note.title }}
  </v-list-item>
</template>

<style scoped lang="sass">

</style>
