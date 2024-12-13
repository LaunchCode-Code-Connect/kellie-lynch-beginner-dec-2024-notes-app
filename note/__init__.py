from flask import Blueprint

bp = Blueprint('note', __name__, url_prefix='/note')

from note import get_note