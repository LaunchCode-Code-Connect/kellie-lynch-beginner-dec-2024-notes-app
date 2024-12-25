<script setup>

import LoginForm from "@/components/LoginForm.vue";
import {ref} from "vue";
import {useUserStore} from "@/stores/user.js";

const loginMenu = ref(false);
const user = useUserStore();

</script>

<template>
  <v-app-bar title="Application bar">
    <v-menu
      v-model="loginMenu"
      :close-on-content-click="false"
    >
      <template #activator="{ props }">
        <v-btn
          v-if="!(user.isLoggedIn === true)"
          v-bind="props"
        >
          Login
        </v-btn>
        <v-btn
          v-else
          @click="user.logout"
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
</template>

<style scoped lang="sass">

</style>
