import { ref } from 'vue';

export default class User {
  constructor(data = {'id': 0, 'username': '', 'notes': []}) {
    this.id = ref(data['id']);
    this.username = ref(data['username']);
    this.notes = ref(data['notes']);
  }
}
