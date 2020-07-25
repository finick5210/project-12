const fs = require('fs');
const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
  const filePath = path.join('./data/cards.json');
  const reader = fs.createReadStream(filePath, { encoding: 'utf8' });

  reader.pipe(res);
});

module.exports = router;