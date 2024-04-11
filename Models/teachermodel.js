const mongoose=require("mongoose");
const student_schema=new mongoose.Schema({
    fullname:{
        type:String,
        required:true,
    },
    Department:{
        type:String,
        required:true,
    },
    phone_num:{
        type:Number,
    },
    email:{
        type:String
    },
    password:{
        type:String
    }

},{timestamps:true});
const teacher_db=mongoose.model("teacher_database",student_schema);

module.exports={teacher_db};

