<script setup>
import {useUserStore} from "@/stores/user.js";

const emit = defineEmits(["submitForm"]);
const username = defineModel("username", {type: Text});
const password = defineModel("password", {type: Text});
async function onSubmit(){
  emit("submitForm");
  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", password.value);
  const res = await fetch(import.meta.env.VITE_API_BASE_URL + "/user/login", {
    method: "POST",
    mode: "cors",
    body: formData})
    .then(res => res.json());
  const store = useUserStore();
  store.login(res["token"], Date.parse(res["expiry"]));
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
