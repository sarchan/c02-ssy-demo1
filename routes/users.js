// Zuerst laden wir die notwendigen Module...
// ... für den Webserver
const express = require('express');
// ... und für die Datenbank
const db = require('../src/database');
const User = require('../src/User');


// Neue Router-Instanz
const router = express.Router();

// GET-Route, um eine Liste aller Benutzer zu erhalten
// URL ist relativ zu Pfad, der in app.js definiert ist
// HTTP Methoden: siehe z.B. https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods
router.get('/', getAllUsers);

/**
 * Neue Funktion, die aufgerufen wird, wenn wir den GET-Request erhalten.
 * @param request  Enthält alle Daten des HTTP-Requests
 * @param response Objekt, an das wir die Antwort retournieren können
 */
function getAllUsers(request, response) {
    // Wir holen uns eine Referenz auf die users-Tabelle (bzw. Collection)
    let userCollection = db.getCollection('users');
    // find == select * from users
    let userObjects = userCollection.find();

    // Die Antwort wird als JSON kodiert.
    // Wir geben einfach alle gefundenen Objekte unverändert aus.
    // Das führt dazu, dass wir auch interne Strukturen der Datenbank sehen
    response.json(userObjects);
}

// GET-Route, um die Daten eines einzelnen Benutzers abzurufen
router.get('/:userId', getSingleUser);

/**
 * Zugehörige Funktion zur Route
 * @param request  Enthält alle Daten des HTTP-Requests
 * @param response Objekt, an das wir die Antwort retournieren können
 */
function getSingleUser(request, response) {
    // Wir holen uns die ID direkt aus den Request-Parametern
    // Der Parameter hat denselben Namen wie oben bei der Route definiert.
    let userId = request.params.userId;

    // Referenz auf users-Collection
    let userCollection = db.getCollection('users');
    // get(id) == select * from users where $loki = id
    let userObject = userCollection.get(userId);

    // Gefundenes Objekt als JSON kodiert retournieren.
    response.json(userObject);
}


// DELETE-Route, welche den angegebenen Benutzer aus der Datenbank löscht
router.delete('/:userId', deleteSingleUser);

/**
 * Zugehörige Funktion zur Route
 * @param request  Enthält alle Daten des HTTP-Requests
 * @param response Objekt, an das wir die Antwort retournieren können
 */
function deleteSingleUser(request, response) {
    // ID-Parameter hat wieder selben Namen wie in Route definiert
    let userId = request.params.userId;
    // Referenz auf users-Collection
    let userCollection = db.getCollection('users');
    // Objekt finden
    let userObject = userCollection.get(userId);

    // Objekt aus Datenbank löschen
    // Hinweis: Wir haben keine Fehlerabfrage oder sonstiges implementiert
    userCollection.remove(userObject);

    // Als Antwort geben wir TRUE zurück, für das erfolgreiche Löschen
    // Alternativ könnten wir auch das gelöschte Objekt selbst retournieren
    response.json(true);
}


router.post("/", createUser);

function createUser(request, response) {
    let name = request.body.name;
    let legs = request.body.legs;

    let newuser = new User();
    newuser.name = name;
    newuser.legs = legs;

    let userCollection = db.getCollection('users');
    let dbuser = userCollection.insert(newuser);

    response.json(dbuser);
}

router.put("/:userId", updateUser);

function updateUser(request, response) {
    let newdata = request.body;

    let userCollection = db.getCollection('users');
    let user = userCollection.get(request.params.userId);

    user.name = newdata.name;
    user.legs = newdata.legs;

    userCollection.update(user);

    response.json(user);
}



// Notwendig: Unsere Datei stellt ein Modul dar.
// Hier geben wir an, welche Variable "public" sind.
// Wir veröffentlichen nur den Router selbst.
module.exports = router;