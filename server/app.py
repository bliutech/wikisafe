import re
from flask import Flask, request, Response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import replicate
import sys
import requests
import datetime
import os
import json

# initialized app
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

    def json(self):
        return {
            "id": self.id,
            "articleId": self.article_id,
            "fileName": self.file_name,
            "author": self.author,
            "last_editor": self.last_editor,
            "date_created": self.date_created,
            "date_modified": self.date_modified,
        }


@app.route("/articles", methods=["GET"])
def articles():
    json = {}
    if File.query.all() is None:
        return json, 404
    json["articles"] = []
    for file in File.query.all():
        json["articles"].append(file.json())
    return json, 200


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
    request_dict = request.json
    text = request_dict["text"]
    resp = requests.post(
        "https://api.smrzr.io/v1/summarize?num_sentences=3&algorithm=kmeans&min_length=40&max_length=500",
        data=text,
    )
    summary = resp.json()["summary"]

    return json.dumps({"summary": summary}), 200


# stable diffusion (image generation)
@app.route("/stablediffusion", methods=["POST"])
def stable_diffusion():
    request_dict = request.json
    prompt = request_dict["prompt"]
    os.environ["REPLICATE_API_TOKEN"] = "bc63ed6d1154de3b6e37ceeac61ba9f71b6fefcb"
    model = replicate.models.get("stability-ai/stable-diffusion")
    image_url = model.predict(prompt=prompt)
    print(image_url, file=sys.stderr)
    return json.dumps({"image_url": image_url}), 200


def CLIP(image_link):
    # Get caption for image
    os.environ["REPLICATE_API_TOKEN"] = "bc63ed6d1154de3b6e37ceeac61ba9f71b6fefcb"
    model = replicate.models.get("rmokady/clip_prefix_caption")
    return model.predict(image=image_link)


def add_captions(md):
    # Returns markdown string md with added captions for all the images where captions where missing
    return re.sub(
        r"\!\[(.*)\]\((.*)\)(?!\s*<figcaption>.*</figcaption>)",
        lambda x: "!["
        + x.group(1)
        + "]("
        + x.group(2)
        + ")<figcaption>"
        + CLIP(x.group(2))
        + "</figcaption>",
        re.sub(
            r"\!\[(.*)\]\((.*)\)\s*<figcaption>\s*</figcaption>",
            lambda x: "!["
            + x.group(1)
            + "]("
            + x.group(2)
            + ")<figcaption>"
            + CLIP(x.group(2))
            + "</figcaption>",
            md,
        ),
    )


@app.route("/caption", methods=["POST"])
def caption():
    request_dict = request.json
    text = request_dict["text"]
    text_captioned = add_captions(text)
    return json.dumps({"captioned": text_captioned}), 200


# sentiment analysis func
# def Sincere(revision):
#     class FullyConnected(nn.Module):
#         def __init__(self, vocab_size, hidden1, hidden2, hidden3):
#             super(FullyConnected, self).__init__()
#             self.fc1 = nn.Linear(vocab_size, hidden1)
#             self.fc2 = nn.Linear(hidden1, hidden2)
#             self.fc3 = nn.Linear(hidden2, hidden3)
#             self.fc4 = nn.Linear(hidden3, 1)

#         def forward(self, inputs):
#             x = F.relu(self.fc1(inputs.squeeze(1).float()))
#             x = F.relu(self.fc2(x))
#             x = F.relu(self.fc3(x))
#             return self.fc4(x)

#     BERT = SentenceTransformer("bert-base-nli-mean-tokens")
#     revision = BERT.encode(revision)
#     model = FullyConnected(768, 128, 64, 8)
#     model.load_state_dict(
#         torch.load(
#             r"C:\Users\email\OneDrive\Documents\Python\quora_classifier\BERT_wikipedia_file",
#             map_location=torch.device("cpu"),
#         )
#     )
#     model = model.to("cpu")
#     return round(torch.sigmoid(model(torch.tensor(revision).reshape([768, 1]))).item())


if __name__ == "__main__":
    app.run()
