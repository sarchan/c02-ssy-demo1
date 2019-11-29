const express = require('express');
const router = express.Router();

router.get('/plus', plus);

function plus(request, response) {
    let a = parseFloat(request.query.a);
    console.log("A = " + a);
    let b = parseFloat(request.query.b);
    console.log("B = " + b);
    let c = a + b;
    response.send('Das Ergebnis ist: ' + c);
}

router.get('/minus', minus);

function minus(req, res) {
    let a = parseFloat(req.query.a);
    let b = parseFloat(req.query.b);
    res.send('Ergebnis: ' + (a-b));
}



router.post('/plus', plus_post);

function plus_post(request, response) {
    let a = request.body.a;
    let b = request.body.b;
    let c = a + b;
    response.send('Das Ergebnis ist: ' + c);
}




module.exports = router;
