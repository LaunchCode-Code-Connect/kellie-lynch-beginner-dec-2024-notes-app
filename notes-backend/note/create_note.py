from flask import request
from extensions import db
from models.note import Note
from note import bp
from flask_jwt_extended import jwt_required, get_jwt_identity

@bp.post('/create')
@jwt_required()
def create_note():
    # TODO: data validation
    uid = get_jwt_identity()
    rq = request.json
    note = Note(user_id=uid, title=rq['title'], body=rq['body'])
    db.session.add(note)
    db.session.commit()
    return f"Added note \"{note.title}\" with id {note.id}", 201