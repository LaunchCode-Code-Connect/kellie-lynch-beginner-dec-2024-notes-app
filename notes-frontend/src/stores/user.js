// Utilities
import { defineStore } from 'pinia'
import { ref, computed, inject, watch } from 'vue';
import { useFetchFromApi } from "@/composables/fetchFromApi.js";
import { useEditorStore } from "@/stores/editor.js";

export const useUserStore = defineStore('user', () =>{
  const cookies = inject('$cookies');

  const tokenString = ref(cookies.get('notes-app-token-string'))
  const tokenExpiry = ref(cookies.get('notes-app-token-expiry'))

  const isLoggedIn = computed(() => {
    return tokenString.value !== null && tokenExpiry.value !== null && Date.parse(tokenExpiry.value) > Date.now();
  })

  if (!isLoggedIn.value) $reset();

  async function login (username, password) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);


    const {data, loading, fetchData } = useFetchFromApi()
    watch(loading, async (newVal) => {
      if( newVal === false ) {
        const v = data.value;
        tokenString.value = v["token"];
        tokenExpiry.value = v["expiry"];
        cookies.set("notes-app-token-string", v["token"]);
        cookies.set("notes-app-token-expiry", v["expiry"]);
        const editorStore = useEditorStore();
        await editorStore.getNotes();
      }
    });
    await fetchData("/user/login", "POST", false, undefined, formData);
  }

  async function logout () {
    const { loading, fetchData } = useFetchFromApi();
    watch(loading, () => {
      $reset();
      // TODO: resetting data stores should happen before logout api call, but that will require
      //  modifying the fetchData method to accept an override token value
    })
    await fetchData("/user/logout", "POST" );
  }

  function $reset () {
    tokenString.value = null;
    tokenExpiry.value = null;
    cookies.remove("notes-app-token-string");
    cookies.remove("notes-app-token-expiry");
    const editorStore = useEditorStore();
    editorStore.$reset();
  }

  return { tokenString, tokenExpiry, isLoggedIn, login, logout, $reset };
})
