const passport  = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const addUser = require('../models/addUser');


passport.use(new GoogleStrategy({

//options for strategy

clientID : keys.google.clientID,
clientSecret : keys.google.clientSecret,
callbackURL: 'https://shopper-pranjal.herokuapp.com/oauth/google/redirect'


},function(accessToken, refreshToken, profile,done){

//passport callback function ;
console.log('passport call back function fired') ;
console.log(profile);

//console.log('photo link is',profile.photos[0].value);
addUser.findOne({googleid:profile.id}).then((currentUser)=>{

if(currentUser){
//if user already exists do nothing
  console.log('user exists') ;
}


else{
//save the user to database if not exits
  addUser.create({
  username : profile.displayName,
  googleid : profile.id ,
  imagepath : profile.photos[0].value
  },function(err,newuser){
  if(err){console.log('Error in saving user to database') ;}


    console.log('User data saved to database')
  }) ;

}//end of else statement

});




} )); //end of google strategy passport use mthod


//id    637399525868-p2mv1lgjm5qi77ahpv6kiu4mffvt305s.apps.googleusercontent.com
//scret  vmnqaahXeNJF-aWFENVQSuQf
