from flask import request, jsonify
from models.user import User
from note import bp
from flask_jwt_extended import jwt_required, get_jwt_identity


@bp.get('/test')
@jwt_required()
def test():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()

    # Check if user exists
    if user:
        return jsonify({'message': 'User found', 'name': user.username})
    else:
        return jsonify({'message': 'User not found'}), 404