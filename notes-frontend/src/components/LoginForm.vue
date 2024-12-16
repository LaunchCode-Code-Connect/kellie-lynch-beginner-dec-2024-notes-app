<script setup>
import {useCookies} from "@/composables/cookies.js";
const username = defineModel("username", {type: Text});
const password = defineModel("password", {type: Text});
const $cookies = useCookies();
async function onSubmit(){
  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", password.value);
  console.log(import.meta.env.VITE_API_BASE_URL)
  const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/user/login", {
    method: "POST",
    mode: "cors",
    body: formData})
    .then(res => res.json());
  $cookies.set("notes-app-token", res["token"]);
}
</script>

<template>
  <v-form @submit.prevent="onSubmit">
    <v-text-field
      v-model="username"
      label="Username"
      required
    />
    <v-text-field
      v-model="password"
      label="Password"
      required
    />
    <v-btn type="submit">
      Login
    </v-btn>
  </v-form>
</template>

<style scoped lang="sass">

</style>
