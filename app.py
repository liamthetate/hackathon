import os
from flask import Flask, render_template, redirect, url_for
from flask_pymongo import PyMongo
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")

mongo = PyMongo(app)

@app.route("/")
def index():
    scores = mongo.db.scores.find()
    return render_template("index.html", scores=scores)


if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
    port=int(os.environ.get("PORT")),
    debug=True)