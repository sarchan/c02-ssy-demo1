const express = require('express');
const router = express.Router();
const axios = require('axios');

// http://localhost:3001/quote/by_name/Hel
router.get('/by_name/:name', getQuoteByName);

async function getQuoteByName(req, res) {
    // Schritt 0: Name aus Request holen
    const name = req.params.name;

    try {
        // Schritt 1: User-Service abfragen
        const response = await axios.get('http://localhost:3000/user/by_name/' + name);
        const user = response.data;

        // Schritt 2: Versicherungsprämie berechnen
        const quote = 1000 + user.legs * 100;

        // Schritt 3: Antwort senden
        res.json({
            risk_premium: quote,
            valid_for: '14 days',
        });
    } catch (error) {
        res.status(500);
        res.send("Interner Fehler bei Kommunikation mit User-Service: " + error.response.statusText);
    }
}

module.exports = router;
