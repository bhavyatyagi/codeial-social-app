const express = require('express');

const router = express.Router();

const {
    resetPasswordRequestController,
    resetPasswordController,
} = require("../controllers/token_controller");

router.post("/requestResetPassword", resetPasswordRequestController);
router.post("/resetPassword", resetPasswordController);

module.exports = router;