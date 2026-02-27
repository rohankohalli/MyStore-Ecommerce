import Users from "../models/Users.js"

export const allUsers = async (req, res, next) => {
    try {
        const users = await Users.findAll({
            attributes: ["id", "name", "email", "role", "status", "createdAt"]
        })

        res.json({ users })
    } catch (error) {
        next(error)
    }
}

export const changeUserRole = async (req, res, next) => {
    try {
        const { role } = req.body;
        const allowed = ["User", "Seller", "Admin"];

        if (!allowed.includes(role)) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const [updated] = await Users.update({ role }, { where: { id: req.params.id } })

        if (!updated) return res.status(404).json({ message: "User not found" })

        res.json({ message: "Role updated" })
    } catch (err) {
        next(err);
    }
}

export const changeUserStatus = async (req, res, next) => {
    try {
        const { status } = req.body

        const [updated] = await Users.update({ status }, { where: { id: req.params.id } })

        if (!updated) return res.status(404).json({ message: "User not found" })

        res.json({ message: "Status updated" });
    } catch (err) {
        next(err)
    }
}
