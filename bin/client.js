const axios = require('axios');

console.log("Programm gestartet!");
axios.get('http://localhost:3000/user/').then(responseErhalten);
console.log("Programm fertig.");


// irgendwann später, wenn Response erhalten wird
function responseErhalten(response) {
    console.log("Response erhalten.");
}
