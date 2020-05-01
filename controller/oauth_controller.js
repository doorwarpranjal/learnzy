const addUser = require('../models/addUser') ;

module.exports.displayloginpage = function(req,res){

res.render('../views/loginpage',{message : "Enter Username & Password"});

}


module.exports.displaysignuppage = function(req,res){

    res.render('../views/signuppage' ,{message : 'Signup here'}) ;

}

module.exports.signupNewUser = (req,res)=>{

addUser.findOne({email : req.body.email}).then((currentUser)=>{

if(currentUser){
 
  console.log('User exists');   
  console.log(currentUser);
  return  res.send('<h2>user exists</h2>') ;

}
else{
  


 addUser.create({name : req.body.name ,
    email : req.body.email ,
    password : req.body.password ,
    phone : req.body.phone,
    googleid : 'none',
    imagepath : 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/1200px-User_icon_2.svg.png'},function(err,User){
    if(err){console.log('Error in saving user to database in oauthcontroller method')}

else{
   
    console.log('saved user to database in oauthcontroller method') ;
    res.send('<h2>Signed up Successful </h2>')
}

 });   


}



});

    
}//end of signup method