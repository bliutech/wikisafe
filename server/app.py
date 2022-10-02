from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import sys
import requests
import datetime
import os
import json


app = Flask(__name__)
CORS(app)
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
    obj = request.json
    usr = obj["usr"]
    pwd = obj["pwd"]

    res = {"username": None, "password": None}

    # error handling
    if not User.query.filter_by(username=usr).first():
        res["username"] = usr
        res["password"] = pwd
        # create user in db
        user = User(username=usr, password=pwd)
        db.session.add(user)
        db.session.commit()

    return res


@app.post("/login")
def login():
    obj = request.json
    usr = obj["usr"]

    u = User.query.filter_by(username=usr).first()
    pwd = u.password if u else None
    res = {"username": usr, "password": pwd}
    return json.dumps(res)


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
    BASE_DIR = os.getcwd() + "/articles"

    if request.method == "GET":
        print(request.args, file=sys.stderr)
        a_id = request.args.get("article_id")

        # check if file exists
        if not File.query.filter_by(article_id=a_id).first():
            return "file not found", 404

        # if it does, read the file contents
        with open(f"{BASE_DIR}/{a_id}.md", "r") as w:
            response = w.read()
            return json.dumps({"response": response}), 200

    elif request.method == "POST":
        print(request.json, file=sys.stderr)

        # parse params
        request_dict = request.json
        try:
            a_id = request_dict["article_id"]
            new_text = request_dict["new_text"]
            user = request_dict["user"]
            date = request_dict["date"]
        except:
            return "bad parameters", 400

        # create file
        newFile = File(
            article_id=a_id, file_name=f"{a_id}.md", author=user, date_created=date
        )
        with open(f"{BASE_DIR}/{a_id}.md", "w") as w:
            w.write(new_text)

        # add file record to db
        db.session.add(newFile)
        db.session.commit()

    elif request.method == "PUT":
        request_dict = request.json
        try:
            a_id = request_dict["article_id"]
            new_text = request_dict["new_text"]
            user = request_dict["user"]
            date = request_dict["date"]
        except:
            return "bad parameters", 400

        fileRecord = File.query.filter_by(article_id=a_id).first()
        if not fileRecord:
            return "file not found", 404

        # overwrite file contents
        with open(f"{BASE_DIR}/{a_id}.md", "w") as w:
            w.write(new_text)

        # update file record
        fileRecord.date_modified = date
        fileRecord.last_editor = user
        db.session.commit()

    elif request.method == "DELETE":
        print(request.json, file=sys.stderr)

        fileRecord = File.query.filter_by(article_id=a_id).first()
        if not fileRecord:
            return "file not found", 404

        # delete file
        os.remove(f"{BASE_DIR}/{a_id}.md")

        # delete db entry
        db.session.delete(f)
        db.session.commit()

    return "success", 200


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
