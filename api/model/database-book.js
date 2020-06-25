const Loki = require("lokijs"); //in-memory DB Loki, in json.package schon geladen
const Book = require('./book') //greift auf book.js zu

const db = new Loki(); //neue Instanz der DB
const books = db.addCollection('books')

books.insert(new Book("123", "Franz Kafka", "Der Prozess", 5.66,))

module.exports = db; //stellt db zur Verfügung für andere Dateien

