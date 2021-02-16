import connection from "./../../_config/dbconfig.js";
export default function(req,res){ 
    const {fname, lname, phone} = req.body;
    const uuid = req.query.uuid;
    
    let sqlQuery = `UPDATE users 
        SET fname = '${fname}', 
        lname= '${lname}',
        phone= '${phone}'
        WHERE uuid = '${uuid}'`;

    connection.query(sqlQuery, function (error, field) { 
        if (error) { 
            res.json({
                status:false,
                type:"error",
                title:"Something went wrong.",
                message:'There are some error with query'
            })
        }else{  
            res.json({
                status:true,
                type:"success",
                title:"Awesome",
                message:'You sucessfully updated the profile.'
            })
        }        
    });
}