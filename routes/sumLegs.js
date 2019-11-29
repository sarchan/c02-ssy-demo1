const express = require('express');
const router = express.Router();
const Request = require('request');

router.get('/', getSumLegs);

function getSumLegs(request, response) {
    console.log("sum-legs aufgerufen");
    Request.get({
        url: 'http://127.0.0.1:3000/users',
        json: true
    }, userResponse);
    console.log("Request abgesetzt");

    // Antwort von users-Service
    function userResponse(err, resp, body) {
        console.log("Antwort erhalten");
        let sum = 0;
        for (let user of body) {
            sum += user.legs;
        }
        // retour an CLIENT (response!, nicht resp)
        response.json(sum);
    }

    console.log("SumLegs beendet");
}


module.exports = router;
