import connection from "./../../_config/dbconfig.js"
import { Decrypt } from "./../../utils/encrypt-decrypt.js"

export default function(req, res){ 
    var verification_id = req.query.id;
    console.log("Recieved Verification Key : "+verification_id);
    let email = "";
    try{
        email = Decrypt("emailid", verification_id);
        console.log("Decoded Verification Key : "+ email);
    }catch{
        res.json({
            status:false,
            message:'Invalid link'
        })
    }
    connection.query('SELECT * FROM users WHERE email = ?',[email.toString()], function (error, results, fields) {
        if (error) {
            res.json({
            status:false,
            message:'there are some error with query.'
            })
        }else{
            console.log(results);
            if(results.length < 1 ){
                res.json({
                    status:false,
                    type:"warn",
                    message:'Invalid link'
                })
            }
            if(results[0].verification_key === verification_id){
                if(results[0].status == "inactive"){
                    activateUser(email, res);
                }else{
                    res.json({
                        status:false,
                        type:"info",
                        message:'You have already verified your account.'
                    })
                }
            }else{
                res.json({
                    status:false,
                    type:"warn",
                    message:'Invalid link'
                })
            }
        }   
    });
}

const activateUser = (email, res) =>{
    connection.query('UPDATE users SET status="active" WHERE email="'+email+'"', function (error, { user }, fields) {
        if (error) {
            res.json({
            status:false,
            type:"info",
            message:'Account could not be verified.'
            })
        }else{
            res.json({
                status:true,
                type:"success",
                message:'Account verified successfully'
            })
        }   
    });
}
