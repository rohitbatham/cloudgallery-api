import connection from "./../../_config/dbconfig.js";
import { ComparePassword, EncryptPassword } from "./../../_helpers/password-encryption.js";
export default function(req,res){ 
    const { oldpassword } = req.body; 
    const uuid = req.query.uuid; 
    connection.query('SELECT password FROM users WHERE uuid = ?',[uuid], function (error, results, fields) {
        if (error) { 
            res.json({
              status:false,
              title:"Oops!",
              type:"error",
              message:'There are some error with query'
              })
        }else{
          if(results.length >0){ 
              const { password } = results[0]; 
              ComparePassword(oldpassword, password).then( resp =>{ 
                if(resp.pwdMaches){
                    UpdatePasswrord()
                }else{
                    res.json({
                        status:false,
                        title:"Oops!",
                        type:"error",
                        message:'Your old password does not matches.'
                    })
                }
              })
          }
        }
    });

    const UpdatePasswrord = () =>{
        const { password } = req.body;
        EncryptPassword(password).then((data)=>{
            const { hashedPassword } = data; 
            const sqlQuery = `UPDATE users SET password = '${hashedPassword}' WHERE uuid = '${uuid}'`;
            connection.query(sqlQuery, function (error, results) {
                if (error) { 
                    console.log(error)
                    res.json({
                        status:false,
                        type:"error",
                        title:"Something went wrong.",
                        message:'Something went wrong, Please try again.'
                    })
                }else{  
                    res.json({
                        status:true,
                        data : [],
                        type:"success",
                        title:'Awesome!',
                        message:'Password changed successfully.'
                    })
                }        
            });
        });
    }
}