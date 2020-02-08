const mongoose = require('mongoose') ;

mongoose.pluralize(null);

const Schema = mongoose.Schema ;

const productSchema = new Schema({

productname : String,
productdescription : String,
productprice : Number,
productimage : String

  }) ;

const addProduct = mongoose.model('products',productSchema);

module.exports = addProduct ;
