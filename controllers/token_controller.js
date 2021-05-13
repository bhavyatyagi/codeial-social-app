const JWT = require("jsonwebtoken");
const User = require("../models/user");
const Token = require("../models/token");
// const sendEmail = require("../utils/email/sendEmail");
const tokenMailer = require('../mailers/token_mailer');
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = "10";
const clientURL = "localhost://8000";


const requestPasswordReset = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email does not exist");

    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();

    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;
    console.log("********LINK********", link);
    tokenMailer.newToken(user.email);

    return link;
};

const resetPassword = async (userId, token, password) => {
    let passwordResetToken = await Token.findOne({ userId });

    if (!passwordResetToken) {
        throw new Error("Invalid or expired password reset token");
    }

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
        throw new Error("Invalid or expired password reset token");
    }

    const hash = await bcrypt.hash(password, Number(bcryptSalt));

    await User.updateOne(
        { _id: userId },
        { $set: { password: hash } },
        { new: true }
    );

    const user = await User.findById({ _id: userId });

    tokenMailer.newToken(user.email);

    await passwordResetToken.deleteOne();

    return true;
};
const resetPasswordRequestController = async (req, res, next) => {
    const requestPasswordResetService = await requestPasswordReset(
        req.body.email
    );
    return res.json(requestPasswordResetService);
};

const resetPasswordController = async (req, res, next) => {
    const resetPasswordService = await resetPassword(
        req.body.userId,
        req.body.token,
        req.body.password
    );
    return res.json(resetPasswordService);
};

module.exports = {
    resetPasswordRequestController,
    resetPasswordController,
};