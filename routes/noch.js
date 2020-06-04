const express = require('express');
const router = express.Router();

router.get('/was', hello);

function hello(req, res) {
    res.send('Noch was!');
}

router.get('/mehr', mehrFkt);

function mehrFkt(request, response) {
    // http://localhost:3000/noch/mehr?adj=viel
    const adjektiv = request.query.adj; // immer String
    response.send('Noch ' + adjektiv + ' mehr!');
}

// http://localhost:3000/noch/was?var=wert&var2=wert2#frag1
// --------------------- Host/Authority
//                      ----- app.js
//                           ---- router.get(...)
//                                ------------------- query
//                                                   ------ fragment: wird nie übertragen

module.exports = router;
