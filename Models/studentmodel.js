const mongoose=require("mongoose");
const student_schema=new mongoose.Schema({
    enrollment_number:
    {type :String,
    required:true,
    unique:true},

    fullname:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true,
    },
    year:{
        type:String,
    },
},{timestamps:true});
const student_db=mongoose.model("student_database",student_schema);

module.exports={student_db};

