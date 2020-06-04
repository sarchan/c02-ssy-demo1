const express = require('express');
const router = express.Router();
const db = require('../src/database');
const User = require('../src/User');

router.get('/', listAllUsers);

function listAllUsers(req, res) {
    const userCollection = db.getCollection('users');
    // SQL: select * from userCollection;
    const users = userCollection.find(); // alle BenutzerInnen

    const result = [];
    for (let user of users) {
        result.push({
            primaryKey: user.$loki,
            name: user.name
        });
    }

    res.json(result);
}

// http://localhost:3000/user?nr=2
// http://localhost:3000/user/2 << bevorzugt

router.get('/:id', showSingleUser);

function showSingleUser(req, res) {
    const userId = parseInt(req.params.id);
    const userCollection = db.getCollection('users');
    const user = userCollection.get(userId);
    if (user === null) {
        sendError(res);
    } else {
        res.json(user);
    }
}


function sendError(response) {
    response.status(404);
    response.send("BenutzerIn existiert nicht");
}


router.post('/', newUser);

function newUser(request, response) {
    const name = request.body.name;
    const legs = request.body.legs;
    const user = new User(name, legs);

    const userCollection = db.getCollection('users');
    userCollection.insert(user);

    response.json(user);
}


router.patch('/:nr', updateUser);

function updateUser(req, res) {
    const userId = req.params.nr;
    const newLegs = req.body.legs;

    const userCollection = db.getCollection('users');
    const user = userCollection.get(userId);
    user.legs = newLegs;
    userCollection.update(user);

    res.json(user);
}


module.exports = router;
