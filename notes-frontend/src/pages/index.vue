<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar">
      <v-menu
        v-model="loginMenu"
        :close-on-content-click="false"
      >
        <template #activator="{ props }">
          <v-btn
            v-if="!(userStore.isLoggedIn === true)"
            v-bind="props"
          >
            Login
          </v-btn>
          <v-btn
            v-else
            @click="userStore.logout"
          >
            Logout
          </v-btn>
        </template>
        <v-card
          min-width="300"
        >
          <LoginForm @submit-form="loginMenu=false" />
        </v-card>
      </v-menu>
    </v-app-bar>

    <v-navigation-drawer>
      <v-list>
        <NoteListItem
          v-for="note in userStore.notes"
          :key="note.id"
          :note="note"
        />
      </v-list>
    </v-navigation-drawer>

    <v-main
      class="d-flex align-center justify-center"
      style="min-height: 300px;"
    >
    </v-main>
  </v-layout>
</template>

<script setup>

  import LoginForm from "@/components/LoginForm.vue";
  import {useUserStore} from "@/stores/user.js";
  import { ref } from "vue";
  import NoteListItem from "@/components/NoteListItem.vue";


  const userStore = useUserStore();
  const loginMenu = ref(false);

  // onMounted(async () => {
  //   if (userStore.isLoggedIn === true) {
  //     const { fetchData } = useFetchFromApi();
  //     console.log('logged in in onMounted', userStore.isLoggedIn);
  //     await fetchData("/note/notes", "GET", true)
  //       .then(notes => {
  //         for (const note of notes.value) {
  //           userNotes.value.push(new Note(note));
  //         }
  //       });
  //
  //   }
  // })

</script>
