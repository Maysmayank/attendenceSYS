const mongoose=require("mongoose");
const student_schema=new mongoose.Schema({
    studentname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String
    }
},{timestamps:true});
const student_signup_model=mongoose.model("student_signup",student_schema);

module.exports={student_signup_model};

