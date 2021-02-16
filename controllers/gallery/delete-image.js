import connection from "../../_config/dbconfig.js";
import S3Delete from "../../utils/s3delete.js"
export default function(req,res){ 
    const { id, path} = req.body;
    S3Delete(path).then(resp => {
        if(resp){
            deleteImageDetail();
        }else{
            sendError()
        }
    });
    const deleteImageDetail = () =>{
        const sqlQuery = `DELETE FROM gallery WHERE id = '${id}'`;
        connection.query(sqlQuery, function (error, field) { 
            if (error) { 
                sendError();
            }else{  
                res.json({
                    status:true,
                    type:"success",
                    title:"Deleted",
                    message:'You sucessfully deleted the menu image.'
                })
            }        
        });
    }
    

    const sendError = () =>{
        res.json({
            status:false,
            type:"error",
            title:"Something went wrong.",
            message:'There are some error with query'
        })
    } 
}