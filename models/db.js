var mongoose = require('mongoose'),
  db;
 
db = mongoose.createConnection('localhost:27017/IPEDS_Documentation');
 
db.on('error', function(err){
  if(err) throw err;
});
 
db.once('open', function callback () {
  console.info('Mongo db connected successfully');
});
 
module.exports = db;



