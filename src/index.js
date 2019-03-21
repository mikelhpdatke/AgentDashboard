// require('rootpath')();
const express = require('express');

const app = express();
const path = require('path');

const port = 8081;
app.use(express.static('dist'));

app.get('/*', (req, res) => {
  console.log('in f5');
  res.sendFile(path.resolve(`${__dirname}/../dist/index.html`), err => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    }
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
