const axios = require('axios');

async function client() {
    const response = await axios.get('http://localhost:3000/user/'); // Request senden, auf Response warten, Response dekodieren, in Response-Variable schreiben
    for (let user of response.data) {
        console.log(user.name);
    }
}

client().then();
