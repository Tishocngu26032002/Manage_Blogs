const authService = require("modules/auth/services/authService");
const responseUtils = require("utils/responseUtils");

const authController = {
    login: async (req, res) => {
        try {
            let email = req.body.email;
            let password = req.body.password;
            let dataLogin = await authService.login(email, password);
            res.cookie('accessToken', dataLogin.accesstoken, {
                httpOnly: true,
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                // secure: process.env.NODE_ENV === 'production', // Chỉ sử dụng khi ở môi trường production
                // sameSite: 'Strict', // Ngăn chặn CSRF
            });

            res.cookie('refreshToken', dataLogin.refreshtoken, {
                httpOnly: true,
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                // secure: process.env.NODE_ENV === 'production',
                // sameSite: 'Strict',
            });
            return responseUtils.ok(res, dataLogin);
        } catch (error) {
            return responseUtils.error(res, error.message)
        }
    },

    register: async (req, res) => {
        try {
            let rawdata = {
                fullname: req.body.fullName,
                email: req.body.email,
                password: req.body.password
            }
            console.log(rawdata)
            let checkRegis = await authService.register(rawdata.fullname, rawdata.email, rawdata.password);
            responseUtils.ok(res, checkRegis)
        } catch (error) {
            responseUtils.error(res, error.message);
        }
    },

    refreshTokenRequest: async (req, res) => {
        try {
            console.log("vaof refresh")
            let cookies = req.headers.cookie;
            console.log(cookies)
            const cookiesObject = {};
            if (cookies) {
                cookies.split(';').forEach(cookie => {
                    const [name, value] = cookie.split('=');
                    cookiesObject[name.trim()] = value;
                });
            }
            console.log("acess::::", cookiesObject.accessToken, "refresh::", cookiesObject.accessToken)

            let newAccessToken = await authService.refreshToken(cookiesObject.accessToken, cookiesObject.refreshToken);
            res.cookie('accessToken', newAccessToken, {
                httpOnly: true,
                expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000)
                // secure: process.env.NODE_ENV === 'production', // Chỉ sử dụng khi ở môi trường production
                // sameSite: 'Strict', // Ngăn chặn CSRF
            }); 
            responseUtils.ok(res, newAccessToken);
        } catch (error) {
            responseUtils.error(res, error.message);
        }
    },

    sendEmail: async (req, res) => {
        try {
            let email = req.body.email;
            let send = await authService.sendEmail(email);
            return responseUtils.ok(res, send);
        } catch (error) {
            responseUtils.error(res, error.message);
        }
    },

    validOTP: async (req, res) => {
        try {
            let email = req.body.email;
            let otp = req.body.otp;
            let check = await authService.validOTP(email, otp);
            responseUtils.ok(res, check);
        } catch (error) {
            responseUtils.error(res, error.message);
        }
    },

    resetPassword: async (req, res) => {
        try {
            let email = req.body.email;
            let password = req.body.password;
            let cfPassword = req.body.cfPassword;
            let check = await authService.resetPassword(email, password, cfPassword);
            responseUtils.ok(res, check);
        } catch (error) {
            responseUtils.error(res, error.message);
        }

    }
}

module.exports = authController;