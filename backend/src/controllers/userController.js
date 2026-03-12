import Users from "../models/Users.js"
import bcrypt from "bcrypt"

export const getUser = async (req, res, next) => {
    if (!req.user || !req.user.id) return res.status(401).json({ message: "Invalid token payload" })

    try {
        const user = await Users.findByPk(req.user.id, {
            // attributes: ["id", "name", "email", "role"]
            attributes: ["id", "name", "email", "mobileNo", "dateOfBirth", "role"]
        })
        if (!user) return res.status(404).json({ message: "User not found" })

        res.json({ user })
    } catch (err) {
        console.error("getUser error:", err);
        return res.status(500).json({ message: "Server error" });
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updates = {}
        const allowed = ["name", "email", "mobileNo", "dateOfBirth"]
        for (const key of allowed) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        const updatedUser = Users.update(updates, { where: { id: req.user.id } });

        res.json({ message: "Profile updated", user: updatedUser });
    } catch (error) {
        next(error)
    }
}

export const changePassword = async (req, res, next) => {
    try {
        const { currentPassword, newPassword } = req.body

        const user = await Users.findByPk(req.user.id)

        if (!user) return res.status(400).json({ message: "User Not Found" })

        const matchCurrentPassword = await bcrypt.compare(currentPassword, user.password)

        if (!matchCurrentPassword) return res.status(400).json({ message: "Current Password Incorrect!! Try again" })

        const newPasswordHash = await bcrypt.hash(newPassword, 10)

        await user.update({ password: newPasswordHash })

        return res.json({ message: "Password Updated Successfully" })

    } catch (error) {
        next(error)
    }
}