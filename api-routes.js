import AuthToken from "./_helpers/authToken.js";

import AuthController from "./controllers/user/auth.js";
import VerifyAccountController from "./controllers/user/verify-account.js";
import RegisterController from "./controllers/user/register.js";
import UserController from "./controllers/user/user.js";
import SendOTPController from "./controllers/user/send-otp.js";
//import ValidateOTPController from "./controllers/user/validate-otp.js"
import ResetPasswordController from "./controllers/user/reset-password.js"

import UpdateProfileController from "./controllers/user/update-profile.js";
import UpdatePasswordController from "./controllers/user/change-password.js"

// Gallery services
import UploadImageController from "./controllers/gallery/upload-menu-image.js";
import GalleryController from "./controllers/gallery/get-menu-images.js";
import DeleteImageController from "./controllers/gallery/delete-menu-image.js";


export default function(app){
    app.post('/api/v1/register', RegisterController);
    app.get('/api/v1/verify-account', VerifyAccountController);
    app.post('/api/v1/auth', AuthController);
    app.post('/api/v1/sendotp', SendOTPController);
    app.post('/api/v1/reset-password', ResetPasswordController);

    // Following service are accessibile to authorized user only
    
    // Applicable for both user and business
    app.get('/api/v1/user', AuthToken, (req, res) => {
        UserController(req, res);
    });

    // applicable for business only
    app.patch('/api/v1/profile/update', AuthToken, (req, res) => {
        UpdateProfileController(req, res);
    });
    app.patch('/api/v1/profile/update-password', AuthToken, (req, res) => {
        UpdatePasswordController(req, res);
    });
    // gallery
    app.get('/api/v1/gallery', AuthToken, (req, res) => {
        GalleryController(req, res);
    });
    app.post('/api/v1/gallery/add', AuthToken, (req, res) => {
        UploadImageController(req, res);
    });
    app.delete('/api/v1/gallery/delete', AuthToken, (req, res) => {
        DeleteImageController(req, res);
    });
}

