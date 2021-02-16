import connection from "../../_config/dbconfig.js";
import { EncryptPassword } from "../../_helpers/password-encryption.js";
import { sendVerifcationMail } from "../../_helpers/mailer.js";
import { Encrypt } from "../../utils/encrypt-decrypt.js";
import {  v4 as uuidv4  } from "uuid";

export default function(req,res){ 
  const today = new Date();
  const uuid = uuidv4();
  const { email, password } = req.body;
  const verification_key = Encrypt("emailid", email);

  EncryptPassword(password).then((data)=>{
    
      let user = {
        "uuid" : uuid,
        "fname":req.body.fname || "",
        "lname":req.body.lname || "",
        "phone":req.body.phone || "",
        "email":req.body.email,
        "password": data.hashedPassword,
        "status": "inactive",
        "verification_key": verification_key,
        "created_at":today,
        "updated_at":today
      }

      connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
        if (error) {
            res.json({
                status:false,
                type:"error",
                title:"Something went wrong.",
                message:'There are some error with query'
            });
        }else{
            if(results.length){
              const row = results[0];
              if(row.email == email && row.status === 'active'){
                  res.json({
                    status:false,
                    type:"warn",
                    title:"Email already exists.",
                    message: 'Looks like, You are already signed up.'
                  });
              }else if(row.email == email && row.status === 'inactive'){
                  res.json({
                      status:true,
                      type:"info",
                      title:"Already registered",
                      message: 'You are already registered. Please <a href="/send-verification-link" title="Verify email account">verify your email<a/> account'
                  });
              }
            }else{
                saveUser(req, res, user, verification_key);
            }
        }   
      });
  })
}

const saveUser = (req, res, user, verification_key) => {
  connection.query('INSERT INTO users SET ?', user, function (error, results, fields) {
    if (error) { console.log('Error in adding user', user, error);
      res.json({
          status:false,
          type:"error",
          title:"Something went wrong.",
          message:'There are some error with query'
      })
    }else{
      sendEmail(req, res, verification_key)
    }
  });
}
const sendEmail = (req, res, verification_key) => {
  sendVerifcationMail(req.get('host'), req.body.email, verification_key ).then(response => {
      if(response.messageId){
        res.json({
          status:true,
          type:"success",
          title: "Successfully signed up",
          message:'Please check your email to complete the account verification.'
        })
      }else{
        console.log('Error in sending email');
        res.json({
          status:false,
          type:"error",
          title:"Something went wrong.",
          message:'There are some error with query'
        })
      }
  })
}