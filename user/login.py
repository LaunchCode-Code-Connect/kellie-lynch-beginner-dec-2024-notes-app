from flask import request, jsonify
from models.user import User
from user import bp
from argon2 import PasswordHasher
from flask_jwt_extended import create_access_token

@bp.post('/login')
def login_user():
    rq = request.form.to_dict()
    # user = db.get_or_404(User, username=rq['username'])
    user = User.query.filter_by(username=rq['username']).first()
    hasher = PasswordHasher()
    try:
        hasher.verify(user.password, rq['password'])
    except:
        return jsonify({'message': 'Login failed'}), 401

    token = create_access_token(identity=user.id, additional_claims={'sub': str(user.id)})

    return jsonify({'message': 'Login successful', 'token': token}), 200
