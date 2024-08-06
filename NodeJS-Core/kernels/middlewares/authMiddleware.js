const responseUtils = require("utils/responseUtils");

module.exports = {
    auth: (req, res, next) => {
        let cookies = req.headers.cookie;
        const cookiesObject = {};
        if (cookies) {
            cookies.split(';').forEach(cookie => {
                const [name, value] = cookie.split('=');
                cookiesObject[name.trim()] = value;
            });
        }
        if (!cookiesObject.accessToken) {
            responseUtils.unauthorized(res, "user can not access here!")
        }
        return next();
    }
}