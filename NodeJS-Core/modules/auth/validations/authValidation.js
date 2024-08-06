const { BodyWithLocale } = require("kernels/rules");

const authValidation = {
    login: [
        new BodyWithLocale('email').notEmpty(),
        new BodyWithLocale('email').isEmail(),
        new BodyWithLocale('password').notEmpty()
        //other rules goes here
    ],
    register: [
        //rules
        new BodyWithLocale('fullName').notEmpty(),
        new BodyWithLocale('email').notEmpty(),
        new BodyWithLocale('email').isEmail(),
        new BodyWithLocale('password').notEmpty()
    ],
    refreshToken: [

    ],
    sendEmail: [
        new BodyWithLocale('email').notEmpty(),
        new BodyWithLocale('email').isEmail(),
    ],
    validOTP: [
        new BodyWithLocale('email').notEmpty(),
        new BodyWithLocale('otp').notEmpty(),
        new BodyWithLocale('email').isEmail(),
    ],
    resetPassword: [
        new BodyWithLocale('email').notEmpty(),
        new BodyWithLocale('password').notEmpty(),
        new BodyWithLocale('cfPassword').notEmpty(),
        new BodyWithLocale('email').isEmail(),
    ]
}

module.exports = authValidation