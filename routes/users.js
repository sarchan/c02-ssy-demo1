const express = require('express');
const db = require('../src/database');
const User = require('../src/User');
const router = express.Router();

router.get("/", listAllUsers);

function listAllUsers(request, response) {
    console.log('list all Users: Aufruf');
    const userCollection = db.getCollection('users');
    const users = userCollection.find();    // SELECT * FROM users;
    response.json(users);
    console.log('list all Users: Ende');
}


router.get("/:id", showUser);

function showUser(req, res) {
    const user_id = req.params.id;  // "id", weil in URL ":id"
    const userCollection = db.getCollection('users');
    const user = userCollection.get(user_id);
    res.json(user);
}


router.post('/', newUser);
function newUser(req, res) {
    let user = new User(req.body.name, req.body.legs);
    const userCollection = db.getCollection('users');
    userCollection.insert(user);
    res.json(user);
}

router.delete('/:nr', delUser);
function delUser(req, res) {
    const userCollection = db.getCollection('users');
    let user = userCollection.get(req.params.nr);
    userCollection.remove(user);
    res.json(user);
}

router.put('/:nummer', putUser);
function putUser(req, res) {
    const userCollection = db.getCollection('users');
    let user = userCollection.get(req.params.nummer);
    user.name = req.body.name;
    user.legs = req.body.legs;
    userCollection.update(user);
    res.json(user);
}

module.exports = router;
