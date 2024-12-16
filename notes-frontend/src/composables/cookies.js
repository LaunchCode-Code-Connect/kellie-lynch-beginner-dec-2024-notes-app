import {inject} from 'vue';

export function useCookies() {
  return inject('$cookies');
}
