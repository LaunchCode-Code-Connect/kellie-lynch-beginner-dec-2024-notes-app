import {ref} from 'vue';
import {useUserStore} from "@/stores/user.js";


export function useFetchFromApi() {
  const userStore = useUserStore();
  const data = ref(null);
  const loading = ref(false);
  const error = ref(null);
  async function fetchData (endpoint, method, auth=true, headers={}, body={}) {
    loading.value = true;
    const url = import.meta.env.VITE_API_BASE_URL + endpoint;
    if (auth) {
      if (userStore.isLoggedIn) {
        headers['Authorization'] = `Bearer ${userStore.tokenString}`;
      }
    }
    const params = {
      method: method,
      mode: "cors",
      headers: headers,
    }
    if (method !== 'GET') {
      if (!(body instanceof FormData)) {
        headers['Content-Type'] = 'application/json';
      }

      params.body = body
    }
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
