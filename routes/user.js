// Zuerst laden wir die notwendigen Module...
// ... für den Webserver
const express = require('express');
// ... und für die Datenbank
const database = require('../src/database');
const User = require('../src/User');

// Neue Router-Instanz
const router = express.Router();

// GET-Route, um eine Liste aller Benutzer zu erhalten
// URL ist relativ zu Pfad, der in app.js definiert ist
// HTTP Methoden: siehe z.B. https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol#Request_methods

// Funktionen können direkt inline (anonym) definiert werden, wir verwenden im Allgemeinen aber
// eigene (mit Namen versehene) Funktionen
router.get('/', function(req, res, next) {
    // Wir holen uns eine Referenz auf die users-Tabelle (bzw. Collection)
    let userCollection = database.getCollection('users');
    // find == select * from users
    let users = userCollection.find();

    // Wir geben alle gefundenen Objekte nur mit Namen und ID (= primary key) aus.
    // Bei unserer In-Memory-Datenbank ist die ID im Attribut "$loki" enthalten.
    let result = [];
    // for-Schleifen am Besten mit "for (let x of arr) {...}" machen
    for (let user of users) {
        // Mit console.log() kann man Meldungen in die Server-Konsole schreiben.
        console.log('arbeite an ID='+user.$loki);
        // Eigenes (neues) Objekt erstellen: einfach "{" und "}" verwenden, und innerhalb
        // die Attribute als Key-Value-Paare notieren.
        let obj = {
            id: user.$loki,  // primary key
            name: user.name
        };
        // Mit push() das Objekt ans Ende des Arrays hinzufügen
        result.push(obj);
    }
    // Die Antwort wird als JSON kodiert.
    // mehr Info: https://github.com/arno-h/c02-ssy-cheatsheet
    res.json(result);
});


// GET-Route, um die Daten einzelner BenutzerInnen abzurufen
router.get('/:id', getUser);

/**
 * Zugehörige Funktion zur Route
 * @param request  Enthält alle Daten des HTTP-Requests
 * @param response Objekt, an das wir die Antwort retournieren
 */
function getUser(request, response) {
    // Wir holen uns die ID direkt aus den Request-Parametern
    // Der Parameter hat denselben Namen wie oben bei der Route definiert.
    let userId = request.params.id;
    // Referenz auf die users-Collection holen
    let userCollection = database.getCollection('users');
    // get(id) == select * from users where $loki = id
    let user = userCollection.get(userId);
    // Gefundenes Objekt als JSON kodiert retournieren (inkl. Metadaten der Datenbank)
    response.json(user);
}


// DELETE-Route, welche das angegebene Objekt aus der Datenbank löscht
router.delete('/:id', deleteUser);

/**
 * Zugehörige Funktion zur Route
 * @param request  Enthält alle Daten des HTTP-Requests
 * @param response Objekt, an das wir die Antwort retournieren
 */
function deleteUser(request, response) {
    // ID-Parameter hat wieder selben Namen wie in Route definiert
    let userId = request.params.id;
    // Referenz auf users-Collection
    let userCollection = database.getCollection('users');
    // Objekt finden
    let user = userCollection.get(userId);

    // Objekt aus Datenbank löschen
    // Hinweis: Wir haben keine Fehlerabfrage oder sonstiges implementiert
    userCollection.remove(user);

    // Als Antwort geben wir TRUE zurück, für das erfolgreiche Löschen
    // Alternativ könnten wir auch das gelöschte Objekt selbst retournieren
    response.json(true);
    // response.status(200);
    // response.end();
    // response.status(200).end();
}


// Route, um einen neuen Benutzer/neue Benutzerin anzulegen
// POST wird auf die URL der Collection gemacht
router.post('/', newUser);

/**
 * Zugehörige Funktion zur Route
 * @param request  Enthält alle Daten des HTTP-Requests
 * @param response Objekt, an das wir die Antwort retournieren
 */
function newUser(request, response) {
    // Wenn der Body bereits JSON-kodiert ist, können wir direkt darauf zugreifen:
    // Body sähe so aus: { "name": "Hunbivery", "legs": 2 }
    let name = request.body.name;
    let legs = request.body.legs;

    // Neues User-Objekt anlegen
    let user = new User(name, legs);
    let userCollection = database.getCollection('users');
    // und in Datenbank einfügen
    // dadurch werden im Objekt auch gleich die Metadaten der Datenbank abgelegt.
    userCollection.insert(user);

    // wir retournieren das angelegte Objekt
    // weil es nun Metadaten enthält, kann der Client auch den Primary-Key aus der Antwort auslesen
    response.json(user);
}


// Notwendig: Unsere Datei stellt ein Modul dar.
// Hier geben wir an, welche Variable "public" sind.
// Wir veröffentlichen nur den Router selbst.
module.exports = router;
