const getDate = () =>{
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
    }).replace(/ /g, '-');
    return formattedDate;
}
export default function(AppEndpoint, otp, username = "User"){
    const html = `<table cellspacing="0" cellpadding="0" border="0" style="background:#f1f1f2;width:100%;border-top:10px solid #f1f1f2">
    <tbody><tr>
        <td valign="top" align="center">
                <u></u>
            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#fff;max-width:600px;border:1px solid #dfe0e3;border-bottom:none">
                <tbody><tr><td><u></u>
                
                </td></tr>
                <tr>

                    <td valign="top" style="padding-right:9px;">
                        <div style="font:normal 12px arial;line-height:15px;color:#b1b3b9;text-align:right">
                                &nbsp;
                            <div>${getDate()}</div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td valign="top" align="left" style="padding-bottom:18px;padding-left:15px; font-size:32; font-weight:bold;">
                            <img src="https://cloudgallery.s3.ap-south-1.amazonaws.com/mailerimages/logoicon.png" style="width: 90px; display: block; margin: 10px auto;" />
                    </td>
                </tr>
            </tbody></table>

                <u></u>
            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="background:#d2d710;max-width:600px;border-right:1px solid #d2d710;border-left:1px solid #d2d710">
                    <tbody><tr><td><u></u>
                    
                    </td></tr><tr>
                    <td valign="top" align="left" style="font:bold 22px arial;line-height:25px;color:#fff;padding-top:9px;padding-bottom:9px;padding-left:14px">
                            Reset password using <span class="il">OTP</span>
                        </td>
                    </tr>
                </tbody></table>

            <u></u>
            <table width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:600px;border:1px solid #dfe0e3; margin-bottom:20;border-top:none;border-bottom:1px solid #dfe0e3;background:#fff">
            <tbody><tr><td><u></u>
                </td></tr><tr>
                    <td valign="top" style="padding-top:20px;padding-right:14px;padding-left:14px">
                    <table width="100%" cellspacing="0" cellpadding="0" border="0">
                        <tbody><tr>
                            <td valign="top" style="font:bold 16px arial;line-height:19px;color:#51505d;text-align:left;padding-bottom:9px">
                            Dear User,
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" style="font:normal 16px arial;line-height:21px;color:#51505d;text-align:left;padding-bottom:27px">
                                You can use the below One Time Password (<span class="il">OTP</span>) to reset your password on <a href="${AppEndpoint}" target="_blank" style="outline:none;text-decoration:none;color:#51505d" target="_blank">Cloudgallery.io</a>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" style="font:normal 13px arial;line-height:16px;color:#72727d;text-align:center;padding-bottom:6px">
                                Use this <span class="il">OTP</span>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" align="center">
                            <table width="146" cellspacing="0" cellpadding="0" border="0" style="border:1px solid #dfe0e3;border-radius:6px">
                                <tbody><tr>
                                    <td valign="top" style="font:normal 35px arial;line-height:21px;letter-spacing:2.5px;color:#41404d;text-align:center;padding-top:25px;padding-bottom:27px">
                                        ${otp}
                                    </td>
                                </tr>
                            </tbody></table>
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" style="font:normal 14px arial;line-height:20px;color:#95959d;text-align:left;padding-top:40px;padding-bottom:25px">
                                In case you have not initiated this request, <a href="${AppEndpoint}/contact" style="outline:none;text-decoration:none;color:#00bcd5" target="_blank">write to us</a>.
                            </td>
                        </tr>
                        <tr>
                            <td valign="top" style="font:normal 14px arial;line-height:20px;color:#95959d;text-align:left;padding-top:30px;padding-bottom:25px">
                                Team,<br/>
                                Cloud Gallery
                            </td>
                        </tr>
                        
                    </tbody></table>
                    </td>
                </tr>
            </tbody></table>

            <table>
                <tr>
                    <td valign="top" style="font:normal 12px arial;line-height:20px;color:#95959d;text-align:center;padding-bottom:15px;">
                        <p>© All rights reserved. Cloud Gallery <br />
                            You are receiving this email because you signed up for Cloud Gallery services.<br />
                            This is a transactional email which is sent only once hence no need to unsubscribe.</p>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
</tbody></table>`;
    return html;
}