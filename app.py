import os
from flask import Flask, render_template, redirect, url_for, request
from flask_pymongo import PyMongo
if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")

mongo = PyMongo(app)

@app.route("/")
def index():
    return render_template("index.html")


# Post a score to MongoDB
@app.route('/add_score', methods=['GET', 'POST'])
def add_score():
    if request.method == 'POST':
        scores = mongo.db.scores
        scores.insert_one(request.form.to_dict())
        return redirect(url_for('index'))
    return render_template('index.html')

@app.route("/cards")
def cards():
    return render_template("cards.html")

@app.route("/leaderboard")
def leaderboard():
    return render_template("leaderboard.html")

if __name__ == "__main__":
    app.run(host=os.environ.get("IP"),
    port=int(os.environ.get("PORT")),
    debug=True)