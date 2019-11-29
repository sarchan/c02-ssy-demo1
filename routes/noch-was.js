const express = require('express');
const router = express.Router();

router.get('/was', warum);

function warum(request, response) {
    response.send('Was funktioniert hier warum?');
}

module.exports = router;
