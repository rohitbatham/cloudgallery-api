import connection from "./../../_config/dbconfig.js"
import { ComparePassword } from "./../../_helpers/password-encryption.js";
import jwt from "jsonwebtoken";

export default function(req,res){
    var email=req.body.email;
    var enteredPassword=req.body.password;
    connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
      if (error) {
          res.json({
            status:false,
            title:"Oops!",
            type:"error",
            message:'There are some error with query'
            })
      }else{
        if(results.length >0){
            const { password, uuid} = results[0];
            ComparePassword(enteredPassword, password).then( resp =>{ 
              if(resp.pwdMaches){
                if(results[0].status == 'inactive'){
                  res.json({
                      status:false,
                      type:"info",
                      title: "Account is not verified",
                      message:'Your email is not verified. Please check your inbox to verify it.'
                  })
                }else {
                  const token = generateAccessToken({ uuid: uuid, username: email });
                  res.json({
                      status:true,
                      type:"success",
                      token : token,
                      uuid:uuid,
                      title: "Awesome!",
                      message:'You are signed in successfully.'
                  })
                }
              }else{
                res.json({
                  status:false,
                  type:"error",
                  title:"Oops!",
                  message:"Email or password does not match."
                 });
              }
            })
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

function generateAccessToken(email) {
    // expires after half and hour (1800 seconds = 30 minutes)
    return jwt.sign(email, process.env.TOKEN_SECRET, { expiresIn:  process.env.TOKEN_EXPIRATION });
}