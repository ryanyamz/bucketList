const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const reg = new RegExp('\\.js$', 'i');
const modelsPath = path.join(__dirname, '../models');

mongoose.connect('mongodb://localhost/BucketList');
mongoose.connection.on('connected', () => console.log('connected to mongodb'));

mongoose.Promise = global.Promise;

fs.readdirSync(modelsPath).forEach(model => {
  if (reg.test(model)) {
    require(path.join(modelsPath, model));
  }
});
