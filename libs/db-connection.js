const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect("mongodb+srv://ph01:'123'@cluster0-xyqsd.mongodb.net/test?retryWrites=true", {useMongoClient: true});

mongoose.connection
  .once('open', () => console.log('Đã kết nối đến DB'))
  .on('error', err => console.error(err));
