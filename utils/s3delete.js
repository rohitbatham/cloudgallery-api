import AWS from "aws-sdk";
import Bluebird from "bluebird"
export default async (key) => {
  
    // Configure AWS with your access and secret key.
    const { ACCESS_KEY_ID, SECRET_ACCESS_KEY, AWS_REGION, S3_BUCKET } = process.env;
  
    // Configure AWS to use promise
    AWS.config.setPromisesDependency(Bluebird);
    AWS.config.update({ accessKeyId: ACCESS_KEY_ID, secretAccessKey: SECRET_ACCESS_KEY, region: AWS_REGION });

  
    // Create an s3 instance
    const s3 = new AWS.S3();
    const params = {
        Bucket: S3_BUCKET,
        Key: key
    };
    
    return await s3.deleteObject({
        Bucket: S3_BUCKET,
        Key: key
      }, function (err, data) {
        if (err) {
            return false;
        }
        else{
            return true
        }
    }).promise();
}

