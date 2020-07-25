const fs = require('fs');
const path = require('path');
const router = require('express').Router();

const PATH = './data/users.json';

router.get('/', (req, res) => {
  const filePath = path.join(PATH);
  const reader = fs.createReadStream(filePath, { encoding: 'utf8' });

  reader.pipe(res);
});

router.get('/:id', (req, res) => {
  fs.readFile(path.join(PATH), { encoding: 'utf8' }, (err, users) => {
    if (err) {
      return;
    }

    /* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }] */
    const foundUser = JSON.parse(users).find((user) => user._id === req.params.id);

    if (!foundUser) {
      res.status('404');
      res.send({ message: 'Нет пользователя с таким id' });
      return;
    }
    res.send(foundUser);
  });
});

module.exports = router;
