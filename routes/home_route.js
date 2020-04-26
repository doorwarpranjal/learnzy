const express = require('express');
const router = express.Router() ;

const home_controller = require('../controller/home_controller');

//display home page

router.get('/',home_controller.displayhome);
router.use('/products',require('./products_route.js'));
router.use('/oauth',require('./oauth_route.js'));
router.use('/user',require('./user_route.js'));




module.exports = router ;
