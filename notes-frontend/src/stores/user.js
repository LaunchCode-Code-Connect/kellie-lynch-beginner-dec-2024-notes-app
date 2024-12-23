// Utilities
import { defineStore } from 'pinia'
import { ref, computed, inject, watch } from 'vue';
// import User from "@/models/User.js";
import { useFetchFromApi } from "@/composables/fetchFromApi.js";
import { useStorage } from '@vueuse/core'
import Note from "@/models/Note.js";




export const useUserStore = defineStore('user', () =>{
  const cookies = inject('$cookies');
  // const p = privateUserStore();
  // console.log(p);
  // console.log(p.tokenString);
  // console.log(p.tokenString, null, p.tokenString == null)
  // let user = useStorage( 'user', new User);
  // user = new User;
  let notes = useStorage('notes', []);

  const tokenString = ref(cookies.get('notes-app-token-string'))
  const tokenExpiry = ref(cookies.get('notes-app-token-expiry'))

  const isLoggedIn = computed(() => {
    // const logged = p.tokenString !== null && p.tokenExpiry !== null && parseInt(p.tokenExpiry) > Date.now();
    // console.log("logged in", logged);
    // console.log('user.notes.value', user.notes.value)
    console.log("1", tokenString.value !== null, "2", tokenExpiry.value !== null, "3", Date.parse(tokenExpiry.value) > Date.now());
    console.log(tokenExpiry.value, Date.parse(tokenExpiry.value), Date.now(), tokenString.value)
    return tokenString.value !== null && tokenExpiry.value !== null && Date.parse(tokenExpiry.value) > Date.now();
  })

  async function login (username, password) {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);

    const {data, loading, fetchData } = useFetchFromApi()
    watch(loading, (newVal) => {
      console.log("firing login watch event")
      if( newVal === false ) {
        const v = data.value;
        tokenString.value = v["token"];
        tokenExpiry.value = v["expiry"];
        cookies.set("notes-app-token-string", v["token"]);
        cookies.set("notes-app-token-expiry", v["expiry"]);
        console.log("set values", tokenString.value);
        loadNotes();
      }
    });
    await fetchData("/user/login", "POST", undefined, undefined, formData);
  }

  async function loadNotes() {
    const {data, loading, fetchData } = useFetchFromApi()
    watch(loading, (newVal) => {
      console.log("firing notes watch event")
      if( newVal === false ) {
        const v = data.value;
        notes.value = [];
        for (const note of v) {
          notes.value.push(new Note(note));
        }
      }
    });
    await fetchData("/note/notes", "GET", true);
  }

  async function logout () {
    const { loading, fetchData } = useFetchFromApi();
    watch(loading, (newVal) => {
      console.log("doing client-side logout stuff");
      if( newVal === false ) {
        tokenString.value = null;
        tokenExpiry.value = null;
        cookies.remove("notes-app-token-string");
        cookies.remove("notes-app-token-expiry");
        notes.value = [];
      }
    })
    console.log("about to do server-side logout stuff");
    await fetchData("/user/logout", "POST", true );
    console.log("did server-side logout stuff");
  }

  return { tokenString, tokenExpiry, notes, isLoggedIn, login, logout };
})

// const privateUserStore = defineStore('privateUser', () => {
//   const cookies = inject('$cookies');
//   // console.log('cookies', cookies.get('notes-app-token-string'));
//   const tokenString = ref(cookies.get('notes-app-token-string'));
//   const tokenExpiry = ref(cookies.get('notes-app-token-expiry'));
//
//   function setNewTokenValues(token, expiry) {
//     tokenString.value = token;
//     tokenExpiry.value = expiry;
//     if (token == null){
//       cookies.remove('notes-app-token-string');
//     } else {
//       cookies.set('notes-app-token-string', token);
//     }
//     if (expiry == null){
//       cookies.remove('notes-app-token-expiry');
//     } else {
//       cookies.set('notes-app-token-expiry', expiry);
//     }
//   }
//
//   return { cookies, tokenString, tokenExpiry, setNewTokenValues };
// })
