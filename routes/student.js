const express=require("express");
const router=express.Router();
const { student_signup_model } = require("../Models/studentSIGN_UPmodel");
const { student_db } = require("../Models/studentmodel");
const { google } = require('googleapis');
const credentials = require('../credentials.json'); // Path to your credentials file
const sheets = google.sheets('v4');
const{JWT}=require("google-auth-library")
const {GoogleSpreadsheet}=require("google-spreadsheet");
let path=require("path");
const attendeearray=[];

let isupdated=false;
async function updateGoogleSheets() {
    if(isupdated){
        attendeearray.shift();  // pop first element
    }
    isupdated=true;
  const serviceAccountAuth=new JWT({
    email:credentials.client_email,
    key:credentials.private_key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
  const doc= new GoogleSpreadsheet("1BiQXI9oCvdh2MMTdiWMej-2VPlYEcWqYw2UIrfVFDLU",serviceAccountAuth);
  await doc.loadInfo();
  console.log(doc.title);
  const sheet=doc.sheetsByIndex[0];
  const headers=["Student Name","enrollment","present"];
  await sheet.setHeaderRow(headers);
  const insert=attendeearray.map(record=>[record.studentname,record.enrollment_num,record.present])
await sheet.addRows(insert);
console.log("updated in sheets");

}

router
.post("/signup",async(req,res)=>{
    const student=await student_signup_model.create({
        studentname:req.body.studentname,
        email:req.body.email,
        password:req.body.password,
    })
    console.log(student);
    return res.redirect("/student/login");
})

.post("/login",async(req,res)=>{
    const {studentname,password}=req.body;
    console.log(studentname,"    ",password);
    
    const user=await student_signup_model.findOne({studentname,password});
    if(!user){
        console.log("user not found");
        return res.sendFile(path.join(__dirname, '../public/studentlogin.html'));
    }
    else{
        console.log("user found");
      return res.redirect("/student/dashboard") 
    //    return  res.redirect("/student/student-form-details");
    }
})
.post("/student-form-details",async(req,res)=>{
    console.log("in route");
    const studentdetails=await student_db.create({
        enrollment_number:req.body.enrollment_number,
        fullname:req.body.fullname,
        course:req.body.course,
        year:req.body.year,
    })
    if(!studentdetails){
        console.log("error while uploading data to db");
    }
    console.log(studentdetails);
    console.log("details uploasxded");
   return res.redirect("/student/dashboard");
})
.post("/surveyform", async (req, res) => {
    // Retrieve the enrollment number from the request body
    const studentname=req.body.studentname;
    const enrollmentNumber = req.body.enrollment_number;
    const present=req.body.present;
    console.log("Got the user");
    try {        // Query the database to find if the enrollment number exists
        const existingStudent = await student_db.find({
            enrollment_number:{$eq:enrollmentNumber}
        });
        console.log(existingStudent);
        // If the enrollment number exists in the database
        if (existingStudent.length>0) {
            console.log("user is present");
            const attendeerecord={
                studentname:studentname,
                enrollment_num:enrollmentNumber,
                present:present,
            }
            attendeearray.push(attendeerecord);
            console.log(" Atendence Marked!!");
            console.log(attendeearray);
            updateGoogleSheets();
            return res.render("success");
        }
        else {
            return res.json({message:"Not found Enrollment Number"})
        }
    } catch (error) {
        console.error("Error querying database:", error);
        
    }
});
module.exports=router;
