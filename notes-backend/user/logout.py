from flask import jsonify
from extensions import jwt, db
from models.token import Token
from user import bp
from flask_jwt_extended import jwt_required, get_jwt, get_jwt_header


@bp.post('/logout')
@jwt_required()
def logout():
    identity = get_jwt()
    token = Token(jti=identity["jti"], expires_at=identity["exp"])
    db.session.add(token)
    db.session.commit()
    return jsonify({"message": f"Logged out user {token.jti}"})

@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, jwt_payload):
    blocklisted = Token.query.filter_by(jti = jwt_payload['jti'])
    return blocklisted.count() > 0

@jwt.revoked_token_loader
def revoked_token_callback(jwt_header, jwt_payload):
    return jsonify({"message": "User's token has been revoked"}), 401