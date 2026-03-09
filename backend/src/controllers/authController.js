import Users from "../models/Users.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Op } from "sequelize";
import { sendMail } from "../utils/mailService.js";

export const register = async (req, res, next) => {
    try {
        const { name, email, dateOfBirth, mobileNo, password, role } = req.body;
        const existing = await Users.findOne({ where: { email } })
        if (existing) return res.status(400).json({ message: "Email already in use" })

        const hashed = await bcrypt.hash(password, 10);
        await Users.create({
            name,
            email,
            dateOfBirth,
            mobileNo,
            password: hashed,
            role: role,
        })

        res.status(201).json({ message: "User registered successfully" })
    } catch (err) {
        next(err)
    }
}

export const login = async (req, res, next) => {
    try {
        const { email, password, remember } = req.body

        const user = await Users.findOne({ where: { email } })
        if (!user) return res.status(404).json({ message: "User Not Found" })

        if (user.status === "Banned") return res.status(403).json({ message: "User Invalid" })

        const passwordCheck = await bcrypt.compare(password, user.password)

        if (!passwordCheck) return res.status(401).json({ message: "Invalid Password" })

        const accessToken = generateAccessToken(user)
        const refreshToken = generateRefreshToken(user, remember)

        await user.update({ refreshToken })
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: remember ? 30 * 24 * 3600 * 1000 : 7 * 24 * 3600 * 1000,
            path: "/",
            secure: false
        })

        res.status(200).json({
            message: "Login Successfull", accessToken,
            user: { id: user.id, name: user.name, email: user.email, role: user.role }
        })

    } catch (error) {
        console.error(error)
        res.status(500).json({ message: error.message })
    }
}

export const refreshAccessToken = async (req, res, next) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
        return res.status(401).json({ message: "No Refresh Token provided" });

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

        const user = await Users.findByPk(decoded.id);
        if (!user) return res.status(404).json({ message: "User Not Found" });

        if (user.refreshToken !== refreshToken) {
            return res.status(403).json({ message: "Refresh Token Reused" })
        }
        const newAccessToken = generateAccessToken(user)

        const remember = decoded.remember
        const newRefreshToken = generateRefreshToken(user, remember)

        await user.update({ refreshToken: newRefreshToken });

        res.cookie("refreshToken", newRefreshToken, {
            httpOnly: true,
            sameSite: "lax",
            maxAge: remember ? 30 * 24 * 3600 * 1000 : 7 * 24 * 3600 * 1000,
            path: "/",
            secure: false
        })
        res.json({ accessToken: newAccessToken })
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(403).json({ message: "Refresh token expired" });
        }
        res.status(401).json({ message: "Invalid refresh token" });
    }
}

export const logout = async (req, res, next) => {
    try {
        const refreshToken = req.cookies.refreshToken

        // console.log(refreshToken)
        if (refreshToken) {
            try {
                const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)
                await Users.update({ refreshToken: null }, { where: { id: decoded.id } })
            } catch (err) {
                return res.status(500).json({ message: "Logout failed" });
            }
        }

        res.clearCookie("refreshToken", {
            path: "/",
            sameSite: "lax",
            secure: false
        })

        res.json({ message: "Logged out" });

    } catch (err) {
        next(err)
    }
}

export const requestPasswordReset = async (req, res, next) => {
    try {
        const { email } = req.body

        const user = await Users.findOne({ where: { email } })
        if (!user) return res.status(404).json({ message: "User with the email Not Found" })

        const token = crypto.randomBytes(16).toString('hex')
        await user.update({
            resetToken: token, resetTokenExpiresAt: new Date(Date.now() + 15 * 60 * 1000)
        })

        const resetLink = `http://localhost:5050/reset-password?token=${token}`;

        await sendMail({
            to: user.email,
            subject: "Reset your password",
            html: `
            <h3>Password Reset</h3>
            <p>Click the link below to reset your password:</p>
            <a href="${resetLink}">${resetLink}</a>
            <p>This link expires in 15 minutes.</p>
            `,
        })

        console.log("Reset Link:", resetLink)

        res.json({ message: "Passwored reset link sent" })
    } catch (error) {
        next(error)
    }
}

export const confirmPasswordReset = async (req, res, next) => {
    try {
        const { token, newPassword } = req.body;

        const user = await Users.findOne({ where: { resetToken: token, resetTokenExpiresAt: { [Op.gt]: new Date() } } })

        if (!user) return res.status(400).json({ message: "Invalid or expired token" })

        const hashed = await bcrypt.hash(newPassword, 10)

        await user.update({ password: hashed, resetToken: null, resetTokenExpiresAt: null })

        res.json({ message: "Password updated" })

    } catch (err) {
        next(err)
    }
}
