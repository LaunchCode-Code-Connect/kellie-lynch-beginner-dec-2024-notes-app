from flask import request, jsonify
from extensions import db
from models.note import Note
from note import bp
from flask_jwt_extended import jwt_required, get_jwt_identity

@bp.put('/<note_id>')
@jwt_required()
def edit_note(note_id):
    # TODO: exception handling
    # TODO: data validation
    # TODO: user validation (permission to edit note)
    note = Note.query.get(note_id)
    if not note:
        return f"Note with id {note_id} not found.", 404
    rq = request.get_json()
    new_note = Note(**rq)
    note.title = new_note.title
    note.body = new_note.body
    db.session.add(note)
    db.session.commit()
    return jsonify(note)

@bp.delete('/<note_id>')
@jwt_required()
def delete_note(note_id):
    # TODO: exception handling
    # TODO: user validation (permission to edit note)
    note = Note.query.get(note_id)
    if not note:
        return f"Note with id {note_id} not found.", 404
    db.session.delete(note)
    db.session.commit()
    return f"Note with id {note_id} deleted.", 200