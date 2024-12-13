from extensions import db
from sqlalchemy.orm import Mapped, mapped_column, relationship


class Note(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    user_id: Mapped[int] = mapped_column(foreign_key="user.id")
    title: Mapped[str]
    body: Mapped[str]

    def __repr__(self):
        return f'<Note id {self.id}:{self.title} by user_id {self.user_id}>'