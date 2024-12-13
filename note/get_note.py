from flask import request, jsonify
from models.note import Note
from note import bp
from flask_jwt_extended import jwt_required, get_jwt_identity


@bp.get('/<note_id>')
@jwt_required()
def get_note_by_id(note_id):
    note = Note.query.filter_by(id=note_id).first()
    # TODO: exception handling
    if note:
        return jsonify({'title': note.title, 'body': note.body})
    else:
        return jsonify({'message': f'Note with id {note_id} not found'}), 404

@bp.get('/notes')
@jwt_required()
def get_notes_for_user():
    # TODO: exception handling
    user_id = get_jwt_identity()
    notes = Note.query.filter_by(user_id=user_id).all()
    return jsonify(notes)