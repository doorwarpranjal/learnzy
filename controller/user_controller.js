module.exports.displayprofile = function(req,res){

res.render('../views/profile',{user : req.user.email, imagepath : req.user.imagepath}) ;


//console.log(req.user);

} 

module.exports.uploadimage = (req,res)=> {

res.render('../views/uploadimage' ,{ imagepath : ' ',msg : ' '}) ;


}