import connection from "./../../_config/dbconfig.js";
export default function(req,res){ 
    const uuid = req.query.uuid;
    const sqlQuery = `SELECT * FROM gallery WHERE uuid = ?`;
    connection.query(sqlQuery, [uuid], function (error, results) {
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
                data : results,
                message:'successfully fetched'
            })
        }        
    });
}