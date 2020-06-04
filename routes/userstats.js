const express = require('express');
const router = express.Router();
const db = require('../src/database');

router.get('/max', maxLegs);
router.get('/sum', sumLegs);

function maxLegs(req, res) {
    const userCollection = db.getCollection('users');
    const users = userCollection.find();
    let maxUser = users[0];

    for (let user of users) {
        if (user.legs > maxUser.legs) {
            maxUser = user;
        }
    }

    res.json(maxUser.name);
}

function sumLegs(req, res) {
    const userCollection = db.getCollection('users');
    const users = userCollection.find();
    let sumLegs = 0;

    for (let user of users) {
        sumLegs += user.legs;
    }

    res.json(sumLegs);
}

module.exports = router;
