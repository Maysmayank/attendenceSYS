const express=require("express");
const ConnectMongo = require("./connect");
const StaticRoute=require("./routes/staticRoute");
const app=express();
const bodyParser = require('body-parser');
const PORT=100;
const teacher_route=require("./routes/index")
const path=require("path");
const QRCode=require("qrcode");
const qrcode_route=require("./routes/qrcode");
const student_route=require("./routes/student");
const cookieParser = require("cookie-parser");
const {IP_rangemiddleware}=require("./middlewares/wifi_validation");
const { restrictTologgeduser } = require("./middlewares/auth");
const cors = require('cors');

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}/`);
});

app.use(cors());
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({extended:false}));
app.use("/surveyform",(req,res)=>{
    return res.render("survey")
})
app.set("view engine","ejs");
app.set("views",path.resolve("./views"));
//connection
ConnectMongo("mongodb://127.0.0.1:27017/Attendence_db");
app.use("/",StaticRoute);
app.use("/student",IP_rangemiddleware,student_route);
app.use("/teacher",teacher_route);
app.use("/",restrictTologgeduser,qrcode_route);

const staticpath=path.join(__dirname,"./public");
app.use(express.static(staticpath));
