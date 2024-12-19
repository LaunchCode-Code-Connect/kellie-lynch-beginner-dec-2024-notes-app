// Utilities
import { defineStore } from 'pinia'
import {ref} from 'vue';
import {useCookies} from "@/composables/cookies.js";

// export const useUserStore = defineStore('app', {
//   state: () => ({
//     isLoggedIn: false,
//     token: "",
//   }),
//   setup: () => {
//     console.log("user store setup");
//   },
//   actions: {
//     login(token) {
//       this.token = token;
//       this.isLoggedIn = true;
//     },
//     logout() {
//       this.token = "";
//       this.isLoggedIn = false;
//     }
//   }
// })

export const useUserStore = defineStore('user', () =>{
  const $cookies = useCookies();
  const cookieToken = $cookies.get('notes-app-token');
  const loggedIn = (cookieToken !== null);
  console.log(cookieToken, loggedIn);
  const token = ref(cookieToken);
  const isLoggedIn = ref(loggedIn);
  function login (tk, expiry) {
    token.value = tk;
    isLoggedIn.value = true;
    $cookies.set('notes-app-token', tk);
    $cookies.set('notes-app-token-expiry', expiry);
  }
  function logout () {
    token.value = "";
    isLoggedIn.value = false;
    $cookies.remove('notes-app-token');
    $cookies.remove('notes-app-token-expiry');
  }

  return { token, isLoggedIn, login, logout };
})
