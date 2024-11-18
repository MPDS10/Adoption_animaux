
# Copyright 2022 < mame penda dieng sow et justia Marsie>
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import request, Flask, redirect, url_for
import random
from flask import Flask
from flask import render_template
from flask import g
from .database import Database


app = Flask(__name__, static_url_path="", static_folder="static")


def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        g._database = Database()
    return g._database


@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.disconnect()


@app.route('/')
def index():
    animaux = get_db().get_animaux()
    random.shuffle(animaux)
    return render_template('index.html', animaux=animaux)


@app.route('/animal/<int:animal_id>')
def adopter(animal_id):
    animal = get_db().get_animal(animal_id)
    return render_template('animaux.html', animal=animal)


@app.route('/query', methods=["GET"])
def query():
    animaux = get_db().get_animaux()
    query = request.args.get("q")
    query = query.lower()
    listeAnimaux = []
    for animal in animaux:
        if (query in animal.get("espece").lower() or query in animal.get("race").lower()
           or query in animal.get("ville").lower()):
            listeAnimaux.append(animal)
    return render_template('pageAnimal.html', listeAnimaux=listeAnimaux)


@app.route('/submit', methods=['POST', 'REDIRECT', 'GET'])
def soumettre():

    nom = request.form["nom"]
    espece = request.form["espece"]
    race = request.form["rac"]
    age = request.form["age"]
    courriel = request.form["email_utilisateur"]
    adresse = request.form["adresse"]
    ville = request.form["ville"]
    code_postal = request.form["cp"]
    description = request.form["description"]

    id = get_db().add_animal(nom, espece, race, age, description, courriel,
                             adresse, ville, code_postal)

    return redirect(url_for('adopter', animal_id=id))


@app.route('/form')
def mettre_en_adoption():
    return render_template('form.html')


@app.errorhandler(404)
def page_not_found(e):
    return render_template("erreur404.html"), 404
