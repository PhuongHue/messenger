const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017', {useMongoClient: true});

mongoose.connection
  .once('open', () => console.log('Đã kết nối đến DB'))
  .on('error', err => console.error(err));
