<script setup>
import {useCookies} from "@/composables/cookies.js";
const username = defineModel("username", {type: Text});
const password = defineModel("password", {type: Text});
const $cookies = useCookies();
async function onSubmit(){
  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", password.value);
  const res = await fetch("http://127.0.0.1:5000/user/login", {
    method: "POST",
    mode: "cors",
    body: formData})
    .then(res => res.json());
  $cookies.set("notes-app-token", res["token"]);
  console.log($cookies.get("notes-app-token"));
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
      Submit
    </v-btn>
  </v-form>
</template>

<style scoped lang="sass">

</style>
