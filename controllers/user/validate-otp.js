import connection from "./../../_config/dbconfig.js"

export default function(req,res){
    const { email, otp } = req.body;
    v
    connection.query(`SELECT * FROM users WHERE email = ${email} AND otp = ${otp}`, function (error, results, fields) {
      if (error) { console.log(error);
          res.json({
            status:false,
            title:"Oops!",
            type:"error",
            message:'There are some error with query'
            })
      }else{
          console.log(results);
        if(results.length > 0 ){
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