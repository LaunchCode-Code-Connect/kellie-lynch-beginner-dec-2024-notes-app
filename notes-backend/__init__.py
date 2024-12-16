from flask import Flask
from config import Config
from flask_cors import CORS

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
        from init_database import init_db
        init_db()
        return 'created database'

    CORS(app)

    return app

if __name__ == '__main__':
    # test comment
    create_app().run()