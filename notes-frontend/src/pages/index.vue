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
            {{ userStore.isLoggedIn }}
          </v-btn>
          <v-btn
            v-else
            @click="userStore.logout"
          >
            {{ userStore.isLoggedIn }}
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
        <v-list-item title="Navigation drawer"></v-list-item>
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
  import { useCookies } from "@/composables/cookies.js";

  const userStore = useUserStore();
  const loginMenu = ref(false);
  console.log(useCookies().get("notes-app-token"));

</script>
