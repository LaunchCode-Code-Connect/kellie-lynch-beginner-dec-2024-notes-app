<template>
  <v-layout class="rounded rounded-md">
    <v-app-bar title="Application bar">
      <v-menu
        :close-on-content-click="false"
      >
        <template #activator="{ props }">
          <v-btn
            v-if="!isLoggedIn"
            v-bind="props"
          >
            Login
          </v-btn>
          <v-btn
            v-else
          >
            Logout
          </v-btn>
        </template>
        <v-card min-width="300">
          <LoginForm />
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
  //
import LoginForm from "@/components/LoginForm.vue";
import {useCookies} from "@/composables/cookies.js";
const isLoggedIn = useCookies().get("notes-app-token");
</script>
