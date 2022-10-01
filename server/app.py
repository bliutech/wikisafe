from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
import sys
import requests

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///wikisafe.db"
db = SQLAlchemy(app)


@app.route("/")
def test():
    return "hello world"


# AUTH STUFF
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password = db.Column(db.String(120), unique=False, nullable=False)

    def __repr__(self):
        return "<User %r>" % self.username


@app.post("/register")
def register():
    usr = request.form.get("usr")
    pwd = request.form.get("pwd")

    # error handling
    if len(pwd) <= 0:
        return "bad password", 400
    if User.query.filter_by(username=usr):
        return "account already exists", 401

    # create user in db
    user = User(username=usr, password=pwd)
    db.session.add(user)
    db.session.commit()

    return "success", 200


@app.post("/login")
def login():
    usr = request.form.get("usr")
    pwd = request.form.get("pwd")
    # error handling
    # print(User.query.filter_by(username=usr).filter_by(password=pwd).first(), file=sys.stderr)
    if not User.query.filter_by(username=usr).filter_by(password=pwd).first():
        return "invalid credentials", 400
    else:
        return "success", 200


# test functions; can remove in prod
@app.route("/get_user/<usr>")
def get_user(usr):
    print(User.query.filter_by(username=usr), file=sys.stderr)
    return f"user {usr} found"


@app.get("/get_all_users")
def get_all_users():
    print(User.query.all(), file=sys.stderr)
    return ""


# core feature endpoints
@app.route("/summarize", methods=["POST"])
def summarize():
    text = request.form.get("text")
    resp = requests.post(
        "https://api.smrzr.io/v1/summarize?num_sentences=3&algorithm=kmeans&min_length=40&max_length=500",
        data=text,
    )
    summary = resp.json()["summary"]

    return summary


if __name__ == "__main__":
    app.run()
