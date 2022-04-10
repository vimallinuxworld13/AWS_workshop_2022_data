from flask import Flask

app = Flask(__name__)


@app.route('/')
def hello():
    return '<h1>Hi there</h1>'
'<h3>this is my first practical on flask</h3>'
