import os

basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = "secretkey"
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URI')\
        or 'sqlite:///' + os.path.join(basedir, 'notes.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # JWT_VERIFY_SUB = False