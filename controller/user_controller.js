const addUser = require('../models/addUser') ;

module.exports.displayprofile = function(req,res){

res.render('../views/profile',{user : req.user.email, imagepath : req.user.imagepath}) ;


//console.log(req.user);

} 

module.exports.uploadimage = (req,res)=> {

res.render('../views/uploadimage' ,{ imagepath : ' ',msg : ' '}) ;


}
// this module is called by route user/profile/setNewPassword
module.exports.setNewPassword=(req,res)=>{
    // msg: message/error after Changing Password
    res.render("./setNewPassword",{msg:"",alert:"primary"})
}