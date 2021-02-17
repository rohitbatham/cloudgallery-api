
export default function(link, username = "User"){
    const html = `<div style="font-family:Calibri, Helvetica, sans-serif; font-size: 14px; color: #111111;">
            <p>Dear ${username}, </p>
            <p>Thanks for getting started with Cloud Gallery. You are just one step away to complete your registration. Please Click on the link to verify your email.</p>
            <p><a href=${link} style="color: #fff;padding: 10px 20px; margin: 10px 0px; background-color: #d2d710; border-radius: 5px; text-decoration: none; display: inline-block;">Verify email account</a></p>
            <p>If you face any issue, please copy and paste the below link into your browser.</p>
            <p><a href=${link}>${link}</a></p>
            <p>Team,<br />Cloud Gallery</p><hr style="border-top: #555555;"/>

            <div style="font-size: 12px; padding:20px; background-color:#f7f7f7; color: #000; text-align:center;">
            <p>© All rights reserved. Cloud Gallery <br />
                You are receiving this email because you signed up for Cloud Gallery services.<br />
                This is a transactional email which is sent only once hence no need to unsubscribe.</p>
            </div>
        </div>`;
    return html;
}