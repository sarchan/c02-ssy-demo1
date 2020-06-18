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
            name: user.name,
            legs: user.legs
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
    const user = userCollection.get(userId); // primary key
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


// http://localhost:3000/user/by_name/Sleipnir
router.get('/by_name/:name', getUserByName);

function getUserByName(req, res) {
    const userCollection = db.getCollection('users');
    const nameParam = req.params.name;
    const user = userCollection.findOne({ name: nameParam });
    if (user === null) {
        sendError(res);
    } else {
        res.json(user);
    }

    // const obj = new StdClass();
    // const obj = {};
    // obj.vorname = "Linus";
    // obj.alter = 34;
    // const obj2 = { vorname: "Sandra", alter: 44 };
    // obj2.vorname // "Sandra"
    // obj2.alter // 44
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
