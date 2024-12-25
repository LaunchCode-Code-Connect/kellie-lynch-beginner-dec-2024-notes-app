export default class Note {
  constructor(data) {
    this.id = data['id'];
    this.title = data['title'];
    this.body = data['body'];
    this.author = data['author'] ? data['author'] : data['user_id'] ? data['user_id'] : 0;
    this.createdAt = data['created_at'];
    this.updatedAt = data['updated_at'];
  }
}
