const express = require('express');
const router = express.Router() ;

const products_controller = require('../controller/products_controller');

router.get('/',products_controller.displayproducts);

router.get('/addproduct',products_controller.displayaddproductpage);

router.post('/addproduct',products_controller.addproductdatabase);


module.exports = router ;
