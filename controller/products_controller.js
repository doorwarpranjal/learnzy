const express = require('express');
const route = express.Router ;
const addProduct = require('../models/addProduct');



module.exports.displayproducts = function(req,res){


addProduct.find({},function(err,productslist){

if(err){console.log('error in finding products in database'); return ;}

//console.log('Product is ' , productslist);

return res.render('../views/productpage',{
  
products : productslist

  });

 } ) ;
}


module.exports.displayaddproductpage = function(req,res){
req.flash('notify', 'This is a test notification.')
return res.render('../views/addproduct');

}


module.exports.addproductdatabase = function(req,res){

console.log(req.body);

addProduct.create({
  productname : req.body.name,
  productdescription : req.body.description,
  productprice : req.body.price,
  productimage : req.body.imagepath
},function(err,product){

if(err){console.log('Error in inserting product');}

console.log('product added successfully') ;
return res.render('../views/addproduct');


addProduct.close() ;
});
}
