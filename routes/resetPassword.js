const express = require('express');


const router = express.Router();

const {
    resetPasswordRequestController,
    resetPasswordController,
    resetPasswordUI
} = require("../controllers/token_controller");

router.post("/requestResetPassword", resetPasswordRequestController);
router.get("/resetPassword", resetPasswordUI);
router.post("/resetPassword", resetPasswordController);

module.exports = router;

// improvements required
// 1. Add link to the Mail, improve Mail
// 2. Create another view for password reset where user enters new password and calls for rsetPassword

