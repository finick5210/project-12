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
  fs.readFile(path.join(PATH), { encoding: 'utf8' }, function (err, users) {
    if (err) {
      return;
    }

    const user = JSON.parse(users).find((user) => {
      return user._id === req.params.id;
    });

    if (!user) {
      res.status('404');
      res.send({ "message": "Нет пользователя с таким id" });
      return;
    }
    res.send(user);
  });
});

module.exports = router;