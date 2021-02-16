import connection from "../../_config/dbconfig.js"

export default function(req,res){ 
    let sqlQuery;
    const { uuid } = req.query;
    sqlQuery = `SELECT * FROM users WHERE uuid = ?`
    connection.query(sqlQuery, [uuid], function (error, results) {
        if (error) {
            res.json({
            status:false,
            message:'there are some error with query'
            })
        }else{
            res.json({
                status:true,
                data : results[0],
                message:'successfully fetched'
            })
        }   
    });
}