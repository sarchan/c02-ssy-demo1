const express = require('express');
const router = express.Router();

router.get('/', hello);

function hello(req, res) {
  res.send('Mein erstes Service!');
}

module.exports = router;
