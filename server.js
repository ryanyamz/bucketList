const express = require('express');
const parser = require('body-parser');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');
const port = process.env.PORT || 8000;

const app = express();

app.use(parser.urlencoded({ extended: true }));
app.use(parser.json());

app.use(logger('dev'));

app.use(express.static(path.resolve('dist')));
const sessionConfig = {
  saveUninitialized: true,
  secret: 'sessionSecret',
  resave: false,
  name: 'sessionCookie',
  rolling: true,
  cookie: {
    secure: false,
    httpOnly: false,
    maxAge: 360000,
  }
};
app.use(session(sessionConfig));

require('./server/config/database');

app.use('/api/user', require('./server/config/routes/user.routes'));
app.use('/api/bucket_list', require('./server/config/routes/bucket_list.routes'));

app.use(require('./server/config/catch-all'));




app.listen(port, () => console.log(`express listening on port ${ port }`));
