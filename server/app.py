from flask import Flask
from flask_sqlalchemy import SQLAlchemy
import sys

app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///wikisafe.db"
db = SQLAlchemy(app)


@app.route("/")
def test():
    return "hello world"


@app.route("/create_user/<usr>")
def create_user(usr):
    user = User(username=usr, email=f"{usr}@example.com")
    db.session.add(user)
    db.session.commit()
    return f"user {usr} created!"


@app.route("/get_user/<usr>")
def get_user(usr):
    print(User.query.filter_by(username=usr), file=sys.stderr)
    return f"user {usr} found"


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    def __repr__(self):
        return "<User %r>" % self.username


if __name__ == "__main__":
    app.run()
