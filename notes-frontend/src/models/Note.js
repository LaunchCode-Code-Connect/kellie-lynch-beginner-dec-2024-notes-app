export default class Note {
  constructor(data) {
    this.id = data['id'];
    this.title = data['title'];
    this.body = data['body'];
    this.author = data['user_id'];
    this.createdAt = data['created_at'];
    this.updatedAt = data['updated_at'];
  }
}
