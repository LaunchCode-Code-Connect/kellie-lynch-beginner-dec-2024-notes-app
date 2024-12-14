from typing import List

from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship
from dataclasses import dataclass

from models.note import Note


@dataclass
class User(db.Model):
    # id = db.Column(db.Integer, primary_key=True)
    id: Mapped[int] = mapped_column(db.Integer, primary_key=True)
    # username = db.Column(db.String(10), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(db.String(20), unique=True)
    # password = db.Column(db.String(80), nullable=False)
    password: Mapped[str] = mapped_column(db.String(80))
    notes: Mapped[List[Note]] = relationship("Note", backref="user")

    def __repr__(self):
        return f'<User {self.id}: {self.username}>'