const mongoose = require('mongoose');
const keys = require('./keys');



mongoose.connect(keys.mongodb.dbURI,{useNewUrlParser : false}) ;

mongoose.set('useFindAndModify',false);

const db = mongoose.connection ;

db.on('error',console.error.bind(console,'error in database connection')) ;

db.once('open',()=>{
  console.log('Connected to database');
});
