const passport  = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const addUser = require('../models/addUser');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user,done)=>{
  done(null,user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    addUser.findById(id, function(err, user) {
        done(err, user);
    });
});





passport.use(new LocalStrategy(
  function(username, password, done) {
    addUser.findOne({ email: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (user.password!=password) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    
      
    });
  }
));











passport.use(new GoogleStrategy({

//options for strategy  callback url when running localhost    http://localhost:8000/oauth/google/redirect

//callback for heroku app  https://shopper-pranjal.herokuapp.com/oauth/google/redirect

clientID : keys.google.clientID,
clientSecret : keys.google.clientSecret,
callbackURL: 'http://localhost:8000/oauth/google/redirect'


},function(accessToken, refreshToken, profile,done){

addUser.findOne({googleid:profile.id}).then((currentUser)=>{

//console.log(currentUser);

if(currentUser){
//if user already exists do nothing
  console.log('user exists') ;
  done(null,currentUser);
}

else{
//save the user to database if not exits
  addUser.create({
  name : profile.displayName,  
  email : profile.displayName,
  password : profile.displayName+"@100",
  phone : 'none',
  googleid : profile.id ,
  imagepath : profile.photos[0].value
  

  },function(err,newuser){
  if(err){console.log('Error in saving user to database') ;}


    console.log('User data saved to database')
done(null,newuser);

  }) ;

}//end of else statement

});




} )); //end of google strategy passport use mthod
