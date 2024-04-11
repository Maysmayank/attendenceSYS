const { getUser } = require("../service/auth");

async function restrictTologgeduser(req,res,next){
    const useruid=req.cookies?.uid;
    if(!useruid){
        return res.render("teacherlogin")
    }
    const user=getUser(useruid);
    if(!user){
        return res.render("teacherlogin")
    }

    req.user=user;
    next()

}
module.exports={restrictTologgeduser};