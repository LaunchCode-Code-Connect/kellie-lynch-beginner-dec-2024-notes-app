<template>
  <v-app>
    <AppHeaderBar />
    <v-main>
      <NotesManager />
    </v-main>
  </v-app>
</template>

<script setup>

import AppHeaderBar from "@/components/AppHeaderBar.vue";
import NotesManager from "@/components/NotesManager.vue";
</script>
