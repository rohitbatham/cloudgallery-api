import connection from "../../_config/dbconfig.js"
import { sendResetOTP } from "../../_helpers/mailer.js";

export default function(req,res){
    var email = req.body.email;
    const { otpType }  = req.query;
    const sqlQuery = `SELECT email FROM users WHERE email = '${email}'`;
    connection.query(sqlQuery, function (error, results, fields) {
      if (error) {
        console.log(error);
          res.json({
            status:false,
            title:"Oops!",
            type:"error",
            message:'There are some error with query'
            })
      }else{
        if(results.length >0){
           GenerateOTP(email, otpType, res)
        }
        else{
          res.json({
            status:false,  
            type:"error",  
            message:"Email does not exits"
          });
        }
      }
    });
}

const GenerateOTP = (email, otpType, res) => {
    const otp = Math.floor(1000 + Math.random() * 9000);
    const sqlQuery = `UPDATE users SET otp = '${otp}' WHERE email = '${email}'`;
    connection.query(sqlQuery, function (error, field) { 
        if (error) { 
          console.log(error)
            res.json({
                status:false,
                type:"error",
                title:"Something went wrong.",
                message:'There are some error with query.'
            })
        }else{  
          sendResetOTP(email, otp, otpType).then((data)=>{
               if(data.status){
                res.json({
                    status:true,
                    title:"OTP sent successfully",
                    type:"success",
                    message:'Please check your inbox and verify the OTP.'
                    })
               }else{
                res.json({
                    status:false,
                    type:"error",
                    title:"Something went wrong.",
                    message:'We are having some issue in our system. Please try again.'
                })
               }
            })
            
        }        
    });
}