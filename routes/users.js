const fs = require('fs').promises;
const path = require('path');
const router = require('express').Router();

const PATH = './data/users.json';

router.get('/', (req, res) => {
  fs.readFile(path.join(PATH), 'utf8')
    .then((users) => {
      res.send(users);
    })
    .catch(() => {
      res.status('500').send();
    });
});

router.get('/:id', (req, res) => {
  fs.readFile(path.join(PATH), 'utf8')
    .then((users) => {
      // eslint-disable-next-line no-underscore-dangle
      const foundUser = JSON.parse(users).find((user) => user._id === req.params.id);

      if (!foundUser) {
        res.status('404');
        res.send({ message: 'Нет пользователя с таким id' });
        return;
      }

      res.send(foundUser);
    })
    .catch(() => {
      res.status('500').send();
    });
});

module.exports = router;
