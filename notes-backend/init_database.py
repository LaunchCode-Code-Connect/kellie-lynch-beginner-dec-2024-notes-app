from argon2 import PasswordHasher

from extensions import db
from models.note import Note
from models.user import User


def init_db():
    db.drop_all()
    db.create_all()
    hasher = PasswordHasher()
    hashed1 = hasher.hash("pants")
    hashed2 = hasher.hash("nopants")
    user1 = User(username="kellie", password=hashed1)
    user2 = User(username="notkellie", password=hashed2)
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()
    note1 = Note(title="Test Note", body="Test Note", user_id=user1.id)
    note2 = Note(title="Lorem ipsum", body="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.", user_id=user1.id)
    note3 = Note(title="I am not kellie", body="Why does everyone think I'm kellie?", user_id=user2.id)
    db.session.add(note1)
    db.session.add(note2)
    db.session.add(note3)
    db.session.commit()