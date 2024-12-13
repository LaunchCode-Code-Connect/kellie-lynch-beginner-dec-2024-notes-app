from flask import Flask
from config import Config

def create_app(config = Config):
    app = Flask(__name__)
    app.config.from_object(config)

    from extensions import db, jwt
    db.init_app(app)
    jwt.init_app(app)

    from user import bp as user_bp
    app.register_blueprint(user_bp)
    from note import bp as note_bp
    app.register_blueprint(note_bp)

    @app.route('/init-database')
    def test():
        # from models.user import User
        db.drop_all()
        db.create_all()
        return 'created database'

    return app
