import nodemailer from "nodemailer";
import VerifyEmailTemplate from "./../_templates/verify-account.js";
import { AppEndpoint } from "./../_config/configs.js"
import LoginWithOTP from "../_templates/otp-login.js";
import ResetPwdWOTP from "../_templates/reset-pwd.js";
import ResetNotification from "../_templates/reset-notification.js";

let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: process.env.SMTPEMAIL,
        pass: process.env.SMTPPWD
    }
});

// send mail
export async function sendVerifcationMail(host, email, key){
    var mailOptions;
    const link = AppEndpoint + "/verify-account?id="+key;
    mailOptions={
        from: '"Cloud Gallery" <no-reply@cloudgallery.xyz>',
        to : email,
        subject : "Please confirm your email account",
        html : VerifyEmailTemplate(link)
    }
    try {
        const sentStatus = await transporter.sendMail(mailOptions);
        return sentStatus;
    } catch {
        return false;
    }
}


// send otp for for login
export async function sendLoginOTP(email, otp, otpType = "login"){
    var mailOptions;
    mailOptions={
        from: '"Cloud Gallery" <no-reply@cloudgallery.xyz>',
        to : email,
        subject : `Login With OTP`,
        html : LoginWithOTP(AppEndpoint, otp)
    }
    try {
        const sentStatus = await transporter.sendMail(mailOptions);
        return {
            status : sentStatus
        };
    } catch {
        return {
            status : false
        };
    }
}


// send otp for password reset
export async function sendResetOTP(email, otp){
    var mailOptions;
    mailOptions={
        from: '"Cloud Gallery" <no-reply@cloudgallery.xyz>',
        to : email,
        subject : `Reset Password using OTP`,
        html : ResetPwdWOTP(AppEndpoint, otp)
    }
    try {
        const sentStatus = await transporter.sendMail(mailOptions);
        return {
            status : sentStatus
        };
    } catch {
        return {
            status : false
        };
    }
}

// send otp for password reset
export async function sendResetNotification(email, newPassword){
    var mailOptions;
    mailOptions={
        from: '"Cloud Gallery" <no-reply@cloudgallery.xyz>',
        to : email,
        subject : `Password changed successfully`,
        html : ResetNotification(AppEndpoint, email, newPassword)
    }
    try {
        const sentStatus = await transporter.sendMail(mailOptions);
        return {
            status : sentStatus
        };
    } catch {
        return {
            status : false
        };
    }
}