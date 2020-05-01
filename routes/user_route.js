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

// this is route to get profile of user 
router.get('/profile',authcheck,user_controller.displayprofile);


router.get('/profile/uploadimage',authcheck,user_controller.uploadimage) ;


router.post('/profile/uploadimage/upload',upload.single('avatar'),function(req,res){
  
  addUser.findOneAndUpdate({email : req.user.email}, {imagepath : 'http://localhost:8000/' +req.file.path.slice(7) })
  .then(function(err) {
    
    res.render('../views/uploadimage' ,{imagepath :'http://localhost:8000/' +req.file.path.slice(7), msg:'image uploaded' })
    
    
  }) ;
});


// route connected to setNewPassword.ejs 
router.get('/profile/setNewPassword',authcheck,user_controller.setNewPassword) ;
router.post('/profile/setNewPassword',authcheck,(req,res)=>{
  var NewPassword=req.body.NewPassword;
  var confirmPassword=req.body.confirmPassword;
if(confirmPassword===NewPassword){
  //if confirm password and new password are equal then update password in adduser(mongodb)
addUser.findOneAndUpdate({email:req.user.email},{password:NewPassword}).exec((err,user_data)=>{
  if(err) throw err;
res.render("./setNewPassword",{msg:" Password changed",alert:"primary"})

})
}
else

res.render("./setNewPassword",{msg:" Password and confirm password does not match",alert:"warning"})
}
) ;

module.exports = router ;
