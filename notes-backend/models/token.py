from datetime import datetime
from extensions import db
from sqlalchemy.orm import Mapped, mapped_column
from dataclasses import dataclass

@dataclass
class Token(db.Model):
    __tablename__ = 'token_blocklist'

    id: Mapped[int] = mapped_column(primary_key=True)
    jti: Mapped[str] = mapped_column()
    expires_at: Mapped[datetime] = mapped_column()

    def __repr__(self):
        return f'<Token expiring {self.expires_at}: {self.token}>'