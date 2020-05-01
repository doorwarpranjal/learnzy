const addUser = require('../models/addUser') ;

module.exports.displayprofile = function(req,res){

res.render('../views/profile',{user : req.user.email, imagepath : req.user.imagepath}) ;


//console.log(req.user);

} 

module.exports.uploadimage = (req,res)=> {

res.render('../views/uploadimage' ,{ imagepath : ' ',msg : ' '}) ;


}
// this module is called by route user/profile/setNewPassword
module.exports.displaySetNewPasswordPage=(req,res)=>{
    // msg: message/error after Changing Password
    res.render("./setNewPassword",{msg:"",alert:"primary"})
}



module.exports.setNewPassword = (req,res)=>{
    
    var NewPassword=req.body.NewPassword;
    var confirmPassword=req.body.confirmPassword;


    if (confirmPassword === NewPassword) {
        //if confirm password and new password are equal then update password in adduser(mongodb)
        addUser.findOneAndUpdate({ email: req.user.email }, { password: NewPassword }).exec((err, user_data) => {
            if (err) throw err;
            res.render("./setNewPassword", { msg: " Password changed", alert: "primary" })

        })
    } //end of if statement
    else {
        res.render("./setNewPassword", { msg: " Password and confirm password does not match", alert: "warning" })
    } 
}