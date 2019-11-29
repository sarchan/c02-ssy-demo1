const express = require('express');
const router = express.Router();

router.get('/was', warum);

function warum(request, response) {
    response.send('Was funktioniert hier warum?');
}

router.get('/mehr', mehr);

function mehr(req, res) {
    const schoko = req.query.schoko;
    res.send('Will Schoko: ' + schoko);
}

module.exports = router;
