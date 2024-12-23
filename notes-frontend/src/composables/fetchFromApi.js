import {ref} from 'vue';
import {useUserStore} from "@/stores/user.js";




export function useFetchFromApi() {
  const userStore = useUserStore();
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  async function fetchData (endpoint, method, auth=false, headers={}, body={}) {
    loading.value = true;
    const url = import.meta.env.VITE_API_BASE_URL + endpoint;
    if (auth) {
      console.log("checking logged in tokenString", userStore.tokenString)
      if (userStore.isLoggedIn) {
        console.log("logged in")
        headers['Authorization'] = `Bearer ${userStore.tokenString}`;
      }
    }
    const params = {
      method: method,
      mode: "cors",
      headers: headers,
    }
    if (method !== 'GET') {
      params.body = body
    }
    console.log("request params", params)
    try{
      const response = await fetch(url, params)
      data.value = await response.json();
    } catch(error) {
      error.value = error;
    } finally {
      loading.value = false;
    }
    // return data;
  }

  return{
    data,
    loading,
    error,
    fetchData
  }
}
