// Utilities
import { defineStore } from 'pinia'
import { ref, computed } from 'vue';
import { useCookies } from "@/composables/cookies.js";

export const useUserStore = defineStore('user', () =>{
  const $cookies = useCookies();
  const [str, exp] = getTokenFromCookies();
  const tokenString = ref(str);
  const tokenExpiry = ref(exp)
  function getTokenFromCookies() {
    const tokenStr = $cookies.get('notes-app-token-string');
    const tokenExp = $cookies.get('notes-app-token-expiry');
    return [tokenStr, tokenExp];
  }
  const isLoggedIn = computed(() => {
    return tokenString.value !== null && tokenExpiry.value !== null && parseInt(tokenExpiry.value) > Date.now();
  })
  function login (tk, expiry) {
    console.log("setting", tk, expiry);
    tokenString.value = tk;
    tokenExpiry.value = expiry;
    $cookies.set('notes-app-token-string', tk);
    $cookies.set('notes-app-token-expiry', expiry);
  }
  function logout () {
    tokenString.value = null;
    tokenExpiry.value = null;
    $cookies.remove('notes-app-token-string');
    $cookies.remove('notes-app-token-expiry');
  }

  return { tokenString, tokenExpiry, isLoggedIn, login, logout };
})
