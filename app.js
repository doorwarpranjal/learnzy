const port  = process.env.PORT||8000 ;
const express = require('express');
const mongodb = require('mongodb');
const db = require('./config/connection.js') ;
const app = express() ;
const passportsetup = require('./config/passport-setup.js');



app.set('view engine','ejs');
app.set('views','./views');
app.use(express.static('./assets'));
app.use(express.urlencoded());




app.use('/' , require('./routes/home_route'));



app.listen(port,(err)=>{
if(err){console.log('error in starting serve at app.listen method',err);}

console.log('server started');

});
