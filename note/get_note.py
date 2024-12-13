from flask import request, jsonify
from models.note import Note
from note import bp
from flask_jwt_extended import jwt_required, get_jwt_identity


@bp.get('/get')
@jwt_required()
def get_note():
    rq = request.json.to_dict()
    note = Note.query.filter_by(id=rq["id"]).first()

    # Check if user exists
    if note:
        return jsonify({'title': note.title, 'body': note.body})
    else:
        return jsonify({'message': 'User not found'}), 404