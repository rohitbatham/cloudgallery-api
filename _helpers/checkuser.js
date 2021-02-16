export default async function checkUserAvailability (connection, req, res){
    const email = req.body.email;
    return await connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
        if (error) {
            res.json({
                status:false,
                type:"error",
                title:"Something went wrong.",
                message:'There are some error with query'
            });
        }else{
            if(results.length < 1) return true;
            const row = results[0];
            if(row.email == email && row.status === 'active'){
                return 'active';
                res.json({
                  status:false,
                  type:"warn",
                  title:"Email already exists.",
                  message: 'Looks like, You are already signed up.'
                });
            }else if(row.email == email && row.status === 'inactive'){
                return 'inactive';
                res.json({
                    status:true,
                    type:"info",
                    title:"Already registered",
                    message: 'You are already registered. Please <a href="/send-verification-link" title="Verify email account">verify your email<a/> account'
                });
            }else{
                return true;
            }
            
        }   
    });
}