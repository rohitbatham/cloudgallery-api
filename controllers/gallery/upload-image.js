import connection from "./../../_config/dbconfig.js";
import S3Upload from "./../../utils/s3upload.js"
export default function(req, res){ 
    const uuid = req.query.uuid;
    S3Upload(req.body[0].data_url, uuid).then(({path}) => {
        saveInformation(uuid, path, res);
    });
}

const saveInformation = (uuid, path, res) =>{
    const today = new Date();
    const imageRow = {};
    const sqlQuery = `INSERT INTO gallery SET ?`;
    imageRow["uuid"] = uuid;
    imageRow["image"] = path;
    imageRow["type"] = 'image';
    imageRow["createdAt"] = today;
    imageRow["updatedAt"] = today;
    console.log(imageRow);
    connection.query(sqlQuery, imageRow, function (error, field) { 
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
                title:"Awesome, You have sucessfully added the image",
                message:'You have sucessfully added the image.'
            })
        }        
    });
}