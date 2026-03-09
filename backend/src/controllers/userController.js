import Users from "../models/Users.js"

export const getUser = async (req, res, next) => {
    if (!req.user || !req.user.id) return res.status(401).json({ message: "Invalid token payload" })

    try {
        const user = await Users.findByPk(req.user.id, {
            attributes: ["id", "name", "email", "role"]
            // attributes: ["id", "name", "email", "mobileNo", "dateOfBirth", "role"]
        })
        if (!user) return res.status(404).json({ message: "User not found" })

        res.json({user})
    } catch (err) {
        console.error("getUser error:", err);
        return res.status(500).json({ message: "Server error" });
    }
}

export const updateUser = async (req, res, next) => {
    try {
        for (const key of allowed) {
            if (req.body[key] !== undefined) {
                updates[key] = req.body[key];
            }
        }

        await Users.update(updates, { where: { id: req.user.id } });

        res.json({ message: "Profile updated" });
    } catch (error) {
        next(error)
    }
}
