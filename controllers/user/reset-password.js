import connection from "./../../_config/dbconfig.js"
import { EncryptPassword } from "../../_helpers/password-encryption.js";
import { sendResetNotification } from "../../_helpers/mailer.js";

export default function(req,res){
    const { email, otp } = req.body;
    connection.query(`SELECT email, otp FROM users WHERE email = '${email}' AND otp = '${otp}'`, function (error, results, fields) {
      if (error) { console.log(error);
          res.json({
            status:false,
            title:"Oops!",
            type:"error",
            message:'We are having some issue in our system. Please try again.'
            })
      }else{
        if(results.length > 0 ){
            ResetAccountPassword(email, res)
        }else{
          res.json({
            status:false,  
            type:"error",  
            message:"Invalid either OTP or Email."
          });
        }
      }
    });
}

const ResetAccountPassword = (email, res) =>{
    const newPassword = GeneratePassword();
    EncryptPassword(newPassword).then((data)=>{
    const sqlQuery = `UPDATE users SET password = '${data.hashedPassword}' WHERE email = '${email}'`;
        connection.query(sqlQuery, function (error, field) { 
            if (error) { 
                console.log(error)
                res.json({
                    status:false,
                    type:"error",
                    title:"Something went wrong.",
                    message:'We are having some issue in our system. Please try again.'
                })
            }else{  
            sendResetNotification(email, newPassword).then((data)=>{
                if(data.status){
                    res.json({
                        status:true,
                        title:"Password changed successfully",
                        type:"success",
                        message:'Please check your inbox for new password.'
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
    });
}

const GeneratePassword = () =>{
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}