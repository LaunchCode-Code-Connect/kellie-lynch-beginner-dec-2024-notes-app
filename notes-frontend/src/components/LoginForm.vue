<script setup>
import { useUserStore } from "@/stores/user.js";
import { useFetchFromApi } from "@/composables/fetchFromApi.js";

const emit = defineEmits(["submitForm"]);
const username = defineModel("username", {type: Text});
const password = defineModel("password", {type: Text});
const {fetchData} = useFetchFromApi();
async function onSubmit(){
  emit("submitForm");
  const formData = new FormData();
  formData.append("username", username.value);
  formData.append("password", password.value);

  const store = useUserStore();

  await fetchData("/user/login", "POST", undefined, undefined, formData)
    .then(res => {
      store.login(res.value["token"], Date.parse(res.value["expiry"]))
    });
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
