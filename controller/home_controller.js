const express = require('express');
const route = express.Router ;


module.exports.displayhome = function(req,res){

return res.render('../views/home',{
title : 'Shopper'
});

}
