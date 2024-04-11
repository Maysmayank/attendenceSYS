const express=require("express");
const QRCode=require("qrcode");
const localIpAddress= "192.168.0.103";
const router=express.Router();
router
.get("/generatedQRCODE",(req,res)=>{
    console.log("req processing");
    const data = `http://${localIpAddress}:100/student/surveyform`;    
    // Generate QR code as a data URL
     QRCode.toDataURL(data, (err, url) => {
        if (err) {
            console.error("Error generating QR code:", err);
            return res.status(500).send("Internal Server Error");
        }
        console.log("processing image");
        // Render the scan.ejs template with the QR code data
         res.render("scan",{
            qr_code:url,
        });

    });
})


module.exports=router;