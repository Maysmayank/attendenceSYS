const jwt=require("jsonwebtoken");
const secretkey="Loggedin@teacher";


function setUser(user){
    return jwt.sign({
        fullname:user.fullname,
        password:user.password,
    },secretkey)
}
function getUser(token){
    if(!token){
        return null;
    }
    else{
        return jwt.verify(token,secretkey);
    }
}
module.exports={setUser,getUser}