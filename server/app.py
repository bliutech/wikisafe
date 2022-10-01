from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
import sys
import requests
import datetime
import os

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


# filesystem
class File(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    article_id = db.Column(db.String, unique=True, nullable=False)
    file_name = db.Column(db.String, unique=True, nullable=False)
    author = db.Column(db.String, unique=False, nullable=False)
    last_editor = db.Column(db.String, unique=False, nullable=True)
    date_created = db.Column(db.BIGINT, unique=False, nullable=False)
    date_modified = db.Column(db.BIGINT, unique=False, nullable=True)

    def __repr__(self):
        return "<File %r>" % self.file_name


@app.route("/article", methods=["GET", "POST", "PUT", "DELETE"])
def article():
    a_id = request.form.get("article_id")
    f = File.query.filter_by(article_id=a_id).first()

    # creating article
    if request.method == "POST":
        if f:
            return "file already exists", 401

        new_text = request.form.get("new_text")
        user = request.form.get("user")
        date = request.form.get("date")

        if not a_id or not user or not date:
            return "bad parameters", 400

        f = File(
            article_id=a_id, file_name=f"{a_id}.md", author=user, date_created=date
        )

        with open(f"{os.getcwd()}/articles/{a_id}.md", "w") as w:
            w.write(new_text)

        db.session.add(f)
        db.session.commit()
        return "success", 200

    if not f:
        return "file not found", 404

    # getting article
    if request.method == "GET":
        with open("articles/" + f.file_name, "r") as w:
            return w.read(), 200

    # updating article
    elif request.method == "PUT":
        new_text = request.form.get("new_text")
        user = request.form.get("user")
        date = request.form.get("date")

        if not a_id or not user or not date:
            return "bad parameters", 400

        with open(f"{os.getcwd()}/articles/{a_id}.md", "w") as w:
            w.write(new_text)

        f.date_modified = date
        f.last_editor = user

        db.session.commit()

        return "success", 200

    # deleting article
    elif request.method == "DELETE":
        # delete file
        os.remove(f"{os.getcwd()}/articles/{a_id}.md")

        # delete db entry
        db.session.delete(f)
        db.session.commit()

        return "success", 200

    return "wtf you shouldn't be here", 500


# text summarizer
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
