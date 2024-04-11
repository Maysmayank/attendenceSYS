const express=require("express");
const { teacher_db } = require("../Models/teachermodel");
const { student_db } = require("../Models/studentmodel");
const router=express.Router();
const {v4:uuidv4}=require("uuid");
const path=require("path");
const { setUser } = require("../service/auth");
router
.post("/signup",async(req,res)=>{
    const teacher=await teacher_db.create({
        fullname:req.body.fullname,
        Department:req.body.Department,
        phone_num:req.body.phone_num,
        email:req.body.email,
        password:req.body.password,
    })
    console.log(teacher);
    return res.redirect("/teacher/login");
})

.post("/login",async(req,res)=>{
    const {fullname,password}=req.body;
    const user=await teacher_db.findOne({fullname,password});
    if(!user){
        console.log("user not found");
        return res.sendFile(path.join(__dirname, '../public/teacherlogin.html'));
    }
    else{
    console.log("user logged in");
    const token=setUser(user)
    res.cookie("uid",token);
    return res.redirect("/teacher/dashboard");
    }
})

module.exports=router;