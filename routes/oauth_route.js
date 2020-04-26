const express = require('express');
const router = express.Router() ;
const passport = require('passport');

const oauth_controller = require('../controller/oauth_controller');

router.get('/',oauth_controller.displayloginpage);

router.get('/signup',oauth_controller.displaysignuppage) ;


router.post('/signup',oauth_controller.signupNewUser) ;

router.post('/local',passport.authenticate('local',{successRedirect : '/user/profile'}));

//Handle this with passport
router.get('/google',passport.authenticate('google', { scope: ['profile'] }));


router.get('/google/redirect',passport.authenticate('google',{ successRedirect: '/user/profile',
                                   failureRedirect: '/oauth',
                       failureFlash: 'You need to login first.'}));



router.get('/logout',(req,res)=>{
req.logout();
res.redirect('/')
});

module.exports = router ;
