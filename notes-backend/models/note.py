from datetime import datetime

from extensions import db
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column
from dataclasses import dataclass

@dataclass
class Note(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(ForeignKey('user.id'))
    title: Mapped[str] = mapped_column()
    body: Mapped[str] = mapped_column()
    created_at: Mapped[datetime] = mapped_column(default=db.func.now())
    updated_at: Mapped[datetime] = mapped_column(default= db.func.now(), onupdate=db.func.now())

    def __repr__(self):
        return f'<Note id {self.id}:{self.title} by user_id {self.user_id}>'