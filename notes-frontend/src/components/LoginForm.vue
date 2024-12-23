<script setup>
import { useUserStore } from "@/stores/user.js";
// import { useFetchFromApi } from "@/composables/fetchFromApi.js";

const emit = defineEmits(["submitForm"]);
const username = defineModel("username", {type: Text});
const password = defineModel("password", {type: Text});
// const {fetchData} = useFetchFromApi();
function onSubmit(){
  emit("submitForm");
  const user = useUserStore();
  user.login(username.value, password.value);

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
