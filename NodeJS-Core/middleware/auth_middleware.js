const jwt1 = require('jsonwebtoken');
const jwt = require("configs/jwt");

const authenticateToken = (req, res, next) => {
    console.log("vaof middlewawre")
    let data = req.headers.cookie;
    let accessToken, refreshToken;
    let [access, refresh] = data.split("; ");
    let [aa, aa1] = access.split("=").map(item => item.trim());
    let [aaa, aaa1] = refresh.split("=").map(item => item.trim());

    if (aa == "accessToken") {
        accessToken = aa1;
        refreshToken = aaa1;
    }
    else {
        accessToken = aaa1;
        refreshToken = aa1;
    }

    if (accessToken == null) return res.sendStatus(401);

    let decodedAccess = null;

    try {
        decodedAccess = jwt1.verify(accessToken, jwt.secret);
        req.user = decodedAccess; // Lưu thông tin người dùng đã xác thực vào request
        next();
    } catch (error) {
        if (error instanceof jwt1.TokenExpiredError) {
            console.log("loxi 401 middleware")
            return res.sendStatus(401);
        }
    }
};

const refreshToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken == null) return res.sendStatus(401);

    jwt.verify(refreshToken, config.jwt.secret, (err, user) => {
        if (err) return res.sendStatus(403);

        const newAccessToken = generateAccessToken(user);
        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        });

        res.json({ accessToken: newAccessToken });
    });
};

module.exports = { authenticateToken, refreshToken }
