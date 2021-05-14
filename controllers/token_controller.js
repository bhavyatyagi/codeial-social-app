const JWT = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/token");
// const sendEmail = require("../utils/email/sendEmail");
const tokenMailer = require('../mailers/token_mailer');
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = "10";
const clientURL = "localhost:8000";


const requestPasswordReset = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        return false;
    }

    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();

    const link = `${clientURL}/auth/resetPassword?token=${resetToken}&id=${user._id}`;
    console.log("********LINK********", link);
    tokenMailer.newToken(user.email, link);

    return true;;
};

const resetPassword = async (userId, token, password) => {
    // console.log("Trying to save new password");
    // console.log("UserID", userId);
    // console.log("token", token);
    // console.log("password", password);
    let passwordResetToken = await Token.findOne({ userId });
    // console.log(passwordResetToken);
    if (!passwordResetToken) {
        throw new Error("Invalid or expired password reset token");
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
        throw new Error("Invalid or expired password reset token");
    }
    // const hash = await bcrypt.hash(password, Number(bcryptSalt));

    await User.updateOne(
        { _id: userId },
        { $set: { password: password } },
        { new: true }
    );

    const user = await User.findById({ _id: userId });

    tokenMailer.newPassword(user.email);

    await passwordResetToken.deleteOne();

    return true;
    // return '/';
};
const resetPasswordRequestController = async (req, res, next) => {
    const requestPasswordResetService = await requestPasswordReset(
        req.body.email
    );

    if (requestPasswordResetService === true) {
        req.flash('success', 'Password Reset link sent to Registered Email.');
        return res.redirect('/');
    }
    else {
        req.flash('error', 'Email not registered, Please sign-up!');
        return res.redirect('/users/sign-up');
    }


    // return res.json(requestPasswordResetService);
};

const resetPasswordController = async (req, res, next) => {
    const resetPasswordService = await resetPassword(
        req.body.id,
        req.body.token,
        req.body.password
    );
    // return res.json(resetPasswordService);
    if (resetPasswordService) {
        req.flash('success', 'Password successfully reset, Please Login!');
    }
    else {
        req.flash('error', 'Could not reset password, please retry!');
    }
    return res.redirect('/');
};
const resetPasswordUI = (req, res) => {
    return res.render('reset_password', {
        'token': req.query.token,
        'id': req.query.id
    });
}

module.exports = {
    resetPasswordRequestController,
    resetPasswordController,
    resetPasswordUI
};