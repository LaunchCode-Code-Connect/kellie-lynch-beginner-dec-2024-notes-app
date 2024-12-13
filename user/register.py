from flask import request
from models.user import User
from user import bp
from extensions import db
from argon2 import PasswordHasher

@bp.post('/register')
def register_user():
    # TODO: password validation
    rq = request.form.to_dict()
    hasher = PasswordHasher()
    hashed = hasher.hash(rq['password'])
    user = User(username=rq['username'], password=hashed)
    db.session.add(user)
    db.session.commit()
    # TODO: exception handling
    return f'Added user {user.username} with id {user.id}'