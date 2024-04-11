const express=require("express");
const localIpAddress= "192.168.0.103";
const router=express.Router();
const path=require("path");
// console.log(path.join(__dirname,'../public'));
router
.get("/",(req,res)=>{
    return res.sendFile(path.join(__dirname, '../public/home.html'));
})
.get("/student/student-form-details",(req,res)=>{
    return res.sendFile(path.join(__dirname, '../public/studentDash.html'));
})
.get("/teacher/signup",(req,res)=>{
    return res.sendFile(path.join(__dirname, '../public/teachersignup.html'));
})
.get("/student/signup",(req,res)=>{
    return res.sendFile(path.join(__dirname, '../public/studentsignup.html'));

})
.get("/teacher/login",(req,res)=>{
    return res.sendFile(path.join(__dirname, '../public/teacherlogin.html'));

})
.get("/teacher/dashboard",(req,res)=>{
    return res.sendFile(path.join(__dirname, '../public/teacherDash.html'));

})
.get("/student/login",(req,res)=>{
    return res.sendFile(path.join(__dirname, '../public/studentlogin.html'));
})
.get("/student/dashboard",(req,res)=>{
    return res.sendFile(path.join(__dirname, '../public/studentDash.html'));

})
.get("/student/surveyform",(req,res)=>{
    return res.render("survey")
})
.get("/teacher/generateQR",(req,res)=>{
    return res.render("qrgenerate")
})
.get("/otherpage",(req,res)=>{
    return res.render("otherpage")
})
module.exports=router;