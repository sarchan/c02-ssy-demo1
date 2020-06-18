const express = require('express');
const router = express.Router();

router.get('/add', plus);
router.get('/sub', minus);
router.get('/mul', multiply);
router.get('/div', divide);

// http://localhost:3000/calc/sub?number1=100&number2=18

function plus(req, res) {
    const zahl1 = parseFloat(req.query.number1);
    const zahl2 = parseFloat(req.query.number2);
    const result = zahl1 + zahl2;
    res.send('Result: ' + result);
}

function minus(req, res) {
    const zahl1 = parseFloat(req.query.number1);
    const zahl2 = parseFloat(req.query.number2);
    const result = zahl1 - zahl2;
    res.send('Result: ' + result);
}

function multiply(req, res) {
    const zahl1 = parseFloat(req.query.number1);
    const zahl2 = parseFloat(req.query.number2);
    const result = zahl1 * zahl2;
    res.send('Result: ' + result);
}

function divide(req, res) {
    const zahl1 = parseFloat(req.query.number1);
    const zahl2 = parseFloat(req.query.number2);
    const result = zahl1 / zahl2;
    res.send('Result: ' + result);
}

module.exports = router;
