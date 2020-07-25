const fs = require('fs').promises;
const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  fs.readFile(path.join('./data/cards.json'), 'utf8')
    .then((cards) => {
      res.send(cards);
    })
    .catch(() => {
      res.status('500').send();
    });
});

module.exports = router;
