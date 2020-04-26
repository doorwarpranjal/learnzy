const express = require('express');
const router = express.Router() ;
var multer  = require('multer')
var path = require('path')
const addUser = require('../models/addUser') ;

// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/uploads') 
    },
    filename: function (req, file, cb) {
        
      cb(null, Date.now() +path.extname(file.originalname)) ;
    }
  })
   
 

  var upload = multer({ storage: storage })


const user_controller = require('../controller/user_controller');

const authcheck = (req,res,next)=>{



if(!req.user){
res.redirect('/oauth') ;
}else{
  next();
 }
} ;


router.get('/profile',authcheck,user_controller.displayprofile);


router.get('/profile/uploadimage',authcheck,user_controller.uploadimage) ;


router.post('/profile/uploadimage/upload',upload.single('avatar'),function(req,res){

  addUser.findOneAndUpdate({email : req.user.email}, {imagepath : 'http://localhost:8000/' +req.file.path.slice(7) })
  .then(function(err) {
   
    res.render('../views/uploadimage' ,{imagepath :'http://localhost:8000/' +req.file.path.slice(7), msg:'image uploaded' })
       
   
     }) ;
 });




module.exports = router ;
