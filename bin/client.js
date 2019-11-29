const Request = require('request');

Request.get({
    url: "http://127.0.0.1:3000/users",
    json: true
}, antwortErhalten);

function antwortErhalten(error, response, body) {
    // body ... Array von user-Objekten
    for (let user of body) {
        console.log(user.name);
    }
}
