const mongoose=require("mongoose");
const student_schema=new mongoose.Schema({
    studentname:{
        type:String,
    },
    enrollment_number:{
        type:String,
        unique:true,
    },
    present:{
        type:String,
    }

});
const recent_submit_students=mongoose.model("recents_students",student_schema);
module.exports={recent_submit_students};