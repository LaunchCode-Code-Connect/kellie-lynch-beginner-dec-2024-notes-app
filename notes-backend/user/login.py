import datetime
import argon2.exceptions
from flask import request, jsonify, current_app
from models.user import User
from user import bp
from argon2 import PasswordHasher
from flask_jwt_extended import create_access_token

@bp.post('/login')
def login_user():
    rq = request.form.to_dict()
    print(rq)
    user = User.query.filter_by(username=rq['username']).first()
    hasher = PasswordHasher()
    # TODO: review exception handling
    try:
        hasher.verify(user.password, rq['password'])
    except argon2.exceptions.VerificationError:
        return jsonify({'message': 'Invalid credentials'}), 401
    except:
        return jsonify({'message': 'Login failed'}), 401

    token = create_access_token(identity=user.id, additional_claims={'sub': str(user.id)})
    expiry = str(datetime.datetime.now() + current_app.config["JWT_ACCESS_TOKEN_EXPIRES"])

    return jsonify({'message': 'Login successful', 'token': token, 'expiry': expiry}), 200
