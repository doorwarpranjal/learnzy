const express = require('express');
const router = express.Router() ;

const products_controller = require('../controller/products_controller');


const authcheck = (req,res,next)=>{

if(!req.user){
res.redirect('/oauth') ;
}else{

  next();
 }
} ;

router.get('/',products_controller.displayproducts);

router.get('/addproduct',authcheck,products_controller.displayaddproductpage);

router.post('/addproduct',products_controller.addproductdatabase);


module.exports = router ;
