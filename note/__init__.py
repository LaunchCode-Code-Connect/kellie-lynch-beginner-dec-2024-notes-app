from flask import Blueprint

bp = Blueprint('note', __name__, url_prefix='/note')

from note import create_note, get_note