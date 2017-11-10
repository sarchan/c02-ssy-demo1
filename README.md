Einfache Demo-Applikation für NodeJS/Express
============================================

Verzeichnisse & Dateien
-----------------------

* bin/www ... Starten des Webservers, Error-Handling
* public/ ... statische Inhalte, z.B. CSS und Browser-JavaScript
* routes/ ... Hier stehen die einzelnen Controller
    * index.js ... Erzeugt eine einfache Start-Seite
* src/ ... Datenmodell und Geschäftslogik
    * database.js ... Datenbank und Fixtures mit Beispiel-Daten
    * User.js ... Modell-Klasse
* views/ ... HTML-Templates, zum Erzeugen einfacher HTML-Seiten.
    * layout.hbs ... Basis-Template mit Rahmen-HTML
    * index.hbs ... Einfacher Inhalt für Standard-Seite
    * error.hbs ... Fehlerseite 
* app.js ... Definition & Setup der Express-Applikation
* package.json ... Welche Bibliotheken sonst eingebunden werden sollen
