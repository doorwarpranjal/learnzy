const express = require('express');
const router = express.Router() ;
const passport = require('passport');

const oauth_controller = require('../controller/oauth_controller');

router.get('/',oauth_controller.displayloginpage);



//Handle this with passport
router.get('/google',passport.authenticate('google', { scope: ['profile'] }));


router.get('/google/redirect',passport.authenticate('google'),function(req, res) {
    // Successful authentication, redirect home.

    res.send('/login/success');
  });



router.get('/logout',(req,res)=>{
res.send('Logging out');
});

module.exports = router ;
