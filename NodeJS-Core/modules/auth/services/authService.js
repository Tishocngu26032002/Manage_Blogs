const bcrypt = require('bcryptjs');
const db = require("models/index");
const token = require("utils/jwtUtils");
const jwt1 = require('jsonwebtoken');
const jwt = require("configs/jwt");
const nodemailer = require("nodemailer");


const authService = {
    login: async (email, password) => {
        console.log("email 1", email, password);
        let user = await db.user.findOne({
            where: { email: email },
            include: [
                {
                    model: db.Role
                }
            ]
        });
        if (!user) {
            throw new Error("Email is not exist!") //"Username is not exist!";
        }
        const isValidPassword = bcrypt.compareSync(password, user.password);
        if (!isValidPassword) {
            throw new Error("Password invalid!")
        }
        // Create token
        let access_token = token.sign(user.id, user.Role.title);
        if (!access_token) {
            throw new Error("Login failed! Let try again!") //"Login failed! Let try again!";
        }
        // create refreshtoken
        let refresh_token = token.signRefreshToken(user.id, user.Role.title);
        await db.user.update(
            { refreshtoken: refresh_token },
            {
                where: {
                    email: email
                }
            }
        );
        return {
            message: "Login success!",
            accesstoken: access_token,
            refreshtoken: refresh_token,
            userid: user.id
        }
    },

    register: async (fullname, email, password) => {
        let user = await db.user.findOne({
            where: {
                email: email
            }
        });
        if (user) throw new Error("email is exist!");
        let hashPass = bcrypt.hashSync(password, 10);
        let check = await db.user.create({ fullName: fullname, email: email, password: hashPass, status: 'active', role_id: 2, avatar: "" });
        if (!check) throw new Error("Register not success!");
        else return "Register success!";
    },

    refreshToken: async (access_token, refresh_token) => {
        if (!access_token) {
            throw new Error("acess_token not exist!");
        }
        if (!refresh_token) {
            throw new Error("refresh_token not exist!");
        }
        console.log("refresh token", refresh_token);

        let user = await db.user.findOne({
            where: { refreshtoken: refresh_token, status: 'active' },
            include: [
                {
                    model: db.Role
                }
            ]
        });

        if (!user) {
            throw new Error("user is blocked!");
        }

        let decoded = jwt1.verify(refresh_token, jwt.secret);
        let now = new Date().getTime() / 1000;
        console.log(" la refreshtoken;   ", decoded.exp);


        console.log(now)
        if (now < decoded.exp) {
            let access = token.sign(decoded.userId, decoded.role)
            return access;
        }
        else throw new Error("RefreshToken expired. Login to access website");
    },

    sendEmail: async (email) => {
        let user = await db.user.findOne({
            where: { email: email }
        });
        console.log("email", user);
        if (!user) {
            throw new Error("user not exist!");
        }
        let otp = Math.floor(1000 + Math.random() * 9000);
        let otpExpier = new Date().getTime() + 60 * 1000;
        let otpLast = otp + ":" + otpExpier;
        await db.user.update(
            { otp: otpLast },
            {
                where: { email: email }
            }
        );
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'nvt2632002work@gmail.com',
                pass: 'qdgx khkr vbki hozr',
            },
        });

        const mailOptions = {
            from: 'nvt2632002work@gmail.com',
            to: email,
            subject: 'Password reset OTP',
            text: `Your OTP (It is expired after 1 min) : ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                throw new Error("Email send failed!");
            } else {
                return email;
            }
        });
    },
    validOTP: async (email, otp1) => {
        let now = new Date().getTime();
        let user = await db.user.findOne(
            {
                where: {
                    email: email
                }
            },
        );
        let otp_expired = user?.otp;
        if (!otp_expired) {
            throw new Error("Email not exist!");
        }
        else {
            let [otp, expired] = otp_expired.split(':');
            if (now > expired) {
                throw new Error("Time to life of OTP expired!");
            }
            else {
                if (otp == otp1) {
                    return email;
                }
                throw new Error("OTP not valid!")
            }
        }
    },
    resetPassword: async (email, password, cfPassword) => {
        if (password == cfPassword) {
            let hashPass = bcrypt.hashSync(password, 10);
            let check = await db.user.update(
                { password: hashPass },
                { where: { email: email } }
            );
            if (check) return password;
            else throw new Error("error when update to db!");
        }
        else throw new Error("password and confirm password not equal!");
    }
}

module.exports = authService;